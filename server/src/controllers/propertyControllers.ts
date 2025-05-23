import { Request, Response } from "express";
import { Prisma, PrismaClient, Location } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

export const getProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
      latitude,
      longitude,
    } = req.query;

    let whereConditions: Prisma.Sql[] = [];

    if (favoriteIds) {
      const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
      whereConditions.push(
        Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
      );
    }

    if (priceMin) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
      );
    }

    if (priceMax) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
      );
    }

    if (beds && beds !== "any") {
      whereConditions.push(Prisma.sql`p.beds = ${Number(beds)}`);
    }

    if (baths && baths !== "any") {
      whereConditions.push(Prisma.sql`p.baths = ${Number(baths)}`);
    }

    if (squareFeetMin) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
      );
    }

    if (squareFeetMax) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
      );
    }

    if (propertyType && propertyType !== "any") {
      whereConditions.push(
        Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
      );
    }

    if (amenities && amenities !== "any") {
      const amenitiesArray = (amenities as string).split(",");
      whereConditions.push(Prisma.sql`p.amenities @> ${amenitiesArray}`);
    }

    if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;
      if (availableFromDate) {
        const date = new Date(availableFromDate);
        if (!isNaN(date.getTime())) {
          whereConditions.push(
            Prisma.sql`EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."startDate" <= ${date.toISOString()}
            )`
          );
        }
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusInKilometers = 1000;
      const degrees = radiusInKilometers / 111; // Converts kilometers to degrees

      whereConditions.push(
        Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees}
        )`
      );
    }

    const completeQuery = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', ST_X(l."coordinates"::geometry),
            'latitude', ST_Y(l."coordinates"::geometry)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${
        whereConditions.length > 0
          ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
    `;

    const properties = await prisma.$queryRaw(completeQuery);
    res.json(properties);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving properties: , ${error.message}` });
  }
};

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        location: true,
      },
    });

    if (property) {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

      const geoJSON: any = wktToGeoJSON(coordinates[0].coordinates || "");
      const longitude = geoJSON.coordinates[0];
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude,
            latitude,
          },
        },
      };

      res.json(propertyWithCoordinates);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving property: , ${error.message}` });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    console.log("Creating property with data:", {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      propertyDataKeys: Object.keys(propertyData),
    });

    // Handle photo uploads - check if files exist
    // let photoUrls: string[] = [];
    // if (files && files.length > 0) {
    //   console.log(`Uploading ${files.length} photos...`);
    //   photoUrls = await Promise.all(
    //     files.map(async (file) => {
    //       const uploadParams = {
    //         Bucket: process.env.S3_BUCKET_NAME!,
    //         Key: `properties/${Date.now()}-${file.originalname}`,
    //         Body: file.buffer,
    //         ContentType: file.mimetype,
    //       };

    //       const uploadResult = await new Upload({
    //         client: s3Client,
    //         params: uploadParams,
    //       }).done();

    //       return uploadResult.Location as string;
    //     })
    //   );
    //   console.log("Photos uploaded successfully:", photoUrls.length);
    // } else {
    //   console.log("No photos to upload");
    // }

    // Geocoding - Method 1: Combined query
    const geocodingUrl1 = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
      {
        q: `${address}, ${city}, ${state}, ${country}, ${postalCode}`,
        format: "json",
        limit: "1",
        addressdetails: "1",
      }
    ).toString()}`;

    // Method 2: Structured query (alternative approach)
    const geocodingUrl2 = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
      {
        street: address,
        city: city,
        state: state,
        country: country,
        postalcode: postalCode,
        format: "json",
        limit: "5",
        addressdetails: "1",
      }
    ).toString()}`;

    console.log("Starting geocoding...");
    let geocodingResponse = await axios.get(geocodingUrl1, {
      headers: {
        "User-Agent": "RealEstateRental (testdesk.personal@gmail.com)",
        "Accept-Language": "en",
      },
    });

    if (!geocodingResponse.data || geocodingResponse.data.length === 0) {
      console.log("Trying structured query...");
      geocodingResponse = await axios.get(geocodingUrl2, {
        headers: {
          "User-Agent": "RealEstateRental (testdesk.personal@gmail.com)",
          "Accept-Language": "en",
        },
      });
    }

    if (!geocodingResponse.data || geocodingResponse.data.length === 0) {
      console.log("Trying city-level geocoding...");
      const fallbackUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
        {
          q: `${city}, ${state}, ${country}`,
          format: "json",
          limit: "1",
        }
      ).toString()}`;

      geocodingResponse = await axios.get(fallbackUrl, {
        headers: {
          "User-Agent": "RealEstateRental (testdesk.personal@gmail.com)",
          "Accept-Language": "en",
        },
      });
    }

    const result = geocodingResponse.data[0];

    if (!result || !result.lon || !result.lat) {
      throw new Error(
        `Geocoding failed for address: ${address}, ${city}, ${state}`
      );
    }

    const longitude = parseFloat(result.lon);
    const latitude = parseFloat(result.lat);

    console.log(`Geocoded coordinates: ${latitude}, ${longitude}`);
    console.log(`Display name: ${result.display_name}`);

    // Basic coordinate validation
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error("Invalid coordinates returned from geocoding service");
    }

    // Create location with better error handling
    console.log("Creating location...");
    let location;
    try {
      const locationResult = await prisma.$queryRaw<any[]>`
        INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
        VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode}, 
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
        RETURNING id, address, city, state, country, "postalCode";
      `;
      location = locationResult[0];
      console.log("Location created successfully:", location);
    } catch (locationError: any) {
      console.error("Location creation error:", locationError);
      throw new Error(`Failed to create location: ${locationError.message}`);
    }

    // Validate required fields
    if (!managerCognitoId) {
      throw new Error("Missing required field: managerCognitoId");
    }

    if (!propertyData.pricePerMonth) {
      throw new Error("Missing required field: pricePerMonth");
    }

    // Prepare property data with proper type conversions and null checks
    console.log("Preparing property data...");
    const propertyCreateData = {
      ...propertyData,
      // photoUrls,
      locationId: location.id,
      managerCognitoId,
      amenities:
        typeof propertyData.amenities === "string" &&
        propertyData.amenities.trim()
          ? propertyData.amenities
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : Array.isArray(propertyData.amenities)
          ? propertyData.amenities
          : [],
      highlights:
        typeof propertyData.highlights === "string" &&
        propertyData.highlights.trim()
          ? propertyData.highlights
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : Array.isArray(propertyData.highlights)
          ? propertyData.highlights
          : [],
      isPetsAllowed:
        propertyData.isPetsAllowed === "true" ||
        propertyData.isPetsAllowed === true,
      isParkingIncluded:
        propertyData.isParkingIncluded === "true" ||
        propertyData.isParkingIncluded === true,
      pricePerMonth: parseFloat(propertyData.pricePerMonth),
      securityDeposit: propertyData.securityDeposit
        ? parseFloat(propertyData.securityDeposit)
        : 0,
      applicationFee: propertyData.applicationFee
        ? parseFloat(propertyData.applicationFee)
        : 0,
      beds: propertyData.beds ? parseInt(propertyData.beds) : 1,
      baths: propertyData.baths ? parseFloat(propertyData.baths) : 1,
      squareFeet: propertyData.squareFeet
        ? parseInt(propertyData.squareFeet)
        : 0,
    };

    // Remove undefined values to avoid Prisma issues
    Object.keys(propertyCreateData).forEach((key) => {
      if (propertyCreateData[key] === undefined) {
        delete propertyCreateData[key];
      }
    });

    // console.log("Property data prepared:", {
    //   ...propertyCreateData,
    //   photoUrls: `${photoUrls.length} photos`,
    // });

    // Create property
    console.log("Creating property...");
    let newProperty;
    try {
      newProperty = await prisma.property.create({
        data: propertyCreateData,
        include: {
          location: true,
          manager: true,
        },
      });
      console.log("Property created successfully:", newProperty.id);
    } catch (propertyError: any) {
      console.error("Property creation error:", propertyError);
      console.error("Property error details:", {
        code: propertyError.code,
        meta: propertyError.meta,
        message: propertyError.message,
      });

      // Clean up the location if property creation fails
      try {
        await prisma.location.delete({
          where: { id: location.id },
        });
        console.log("Cleaned up location after property creation failure");
      } catch (cleanupError) {
        console.error("Failed to cleanup location:", cleanupError);
      }

      // Provide more specific error messages based on Prisma error codes
      if (propertyError.code === "P2002") {
        throw new Error("A property with these details already exists");
      } else if (propertyError.code === "P2003") {
        throw new Error("Invalid manager ID or foreign key constraint failed");
      } else if (propertyError.code === "P2025") {
        throw new Error("Manager not found");
      } else {
        throw new Error(`Failed to create property: ${propertyError.message}`);
      }
    }

    res.status(201).json(newProperty);
  } catch (err: any) {
    res.status(500).json({
      message: `Error creating property: ${err.message}`,
    });
  }
};
