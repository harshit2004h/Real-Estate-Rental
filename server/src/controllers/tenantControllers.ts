import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId: cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tenant: , ${error.message}` });
  }
};

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(201).json(tenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating tenant: , ${error.message}` });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updateTenant = await prisma.tenant.update({
      where: {
        cognitoId: cognitoId,
      },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updateTenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error upadating tenant: , ${error.message}` });
  }
};

export const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: {
        tenants: { some: { cognitoId: cognitoId } },
      },
      include: {
        location: true,
      },
    });

    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0].coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.json(residencesWithFormattedLocation);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting current Residences: , ${error.message}`,
    });
  }
};

export const addFavouriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId: cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    const propertyIdNumber = Number(propertyId);
    const existingFavourite = tenant?.favorites || [];

    if (!existingFavourite.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prisma.tenant.update({
        where: {
          cognitoId: cognitoId,
        },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: {
          favorites: true,
        },
      });
      res.json(updatedTenant);
    } else {
      res.status(409).json({
        message: "Property is already in favorites",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: `Error adding favourite property: , ${error.message}`,
    });
  }
};

export const removeFavouriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const propertyIdNumber = Number(propertyId);
    const updatedTenant = await prisma.tenant.update({
      where: {
        cognitoId: cognitoId,
      },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: {
        favorites: true,
      },
    });

    res.json(updatedTenant);
  } catch (error: any) {
    res.status(500).json({
      message: `Error removing favourite property: , ${error.message}`,
    });
  }
};
