import e, { Request, Response } from "express";
import { PrismaClient, Tenant, Property, Location, PaymentHistory, Review } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma: PrismaClient = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params as { cognitoId: string };
    const tenant: (Tenant & {
      favorites: Property[];
    }) | null = await prisma.tenant.findUnique({
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
    const { cognitoId, name, email, phoneNumber }: {
      cognitoId: string;
      name: string;
      email: string;
      phoneNumber: string;
    } = req.body;
    const tenant: Tenant = await prisma.tenant.create({
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
    const { cognitoId } = req.params as { cognitoId: string };
    const { name, email, phoneNumber }: {
      name: string;
      email: string;
      phoneNumber: string;
    } = req.body;
    const updateTenant: Tenant = await prisma.tenant.update({
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
    const { cognitoId } = req.params as { cognitoId: string };
    const properties: (Property & {
      location: Location;
    })[] = await prisma.property.findMany({
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
        const longitude: number = geoJSON.coordinates[0];
        const latitude: number = geoJSON.coordinates[1];

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

export const addFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params as { cognitoId: string; propertyId: string };
    const tenant: (Tenant & {
      favorites: Property[];
    }) | null = await prisma.tenant.findUnique({
      where: {
        cognitoId: cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    const propertyIdNumber: number = Number(propertyId);
    const existingFavorite: Property[] = tenant?.favorites || [];

    if (!existingFavorite.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant: Tenant & {
        favorites: Property[];
      } = await prisma.tenant.update({
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
      message: `Error adding favorite property: , ${error.message}`,
    });
  }
};

export const removeFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params as { cognitoId: string; propertyId: string };
    const propertyIdNumber: number = Number(propertyId);
    const updatedTenant: Tenant & {
      favorites: Property[];
    } = await prisma.tenant.update({
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
      message: `Error removing favorite property: , ${error.message}`,
    });
  }
};

export const getPaymentHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params as { cognitoId: string };
    const paymentHistory: PaymentHistory[] = await prisma.paymentHistory.findMany({
      where: {
        tenantCognitoId: cognitoId,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });
    res.status(200).json(paymentHistory);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving payment history: , ${error.message}`,
    });
  }
};

export const giveReviewToProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { propertyId, cognitoId } = req.params as { propertyId: string; cognitoId: string };
    const { rating, comment }: { rating: number; comment: string } = req.body;
    const newReview: Review = await prisma.review.create({
      data: {
        tenantCognitoId: cognitoId,
        propertyId: Number(propertyId),
        rating: rating,
        comment: comment,
        reviewDate: new Date(),
      },
    });

    //put average rating and count in property table
    const reviews: Review[] = await prisma.review.findMany({
      where: {
        propertyId: Number(propertyId),
      },
    });

    const totalRating: number = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating: number = totalRating / reviews.length;
    const numberOfReviews: number = reviews.length;

    await prisma.property.update({
      where: { id: Number(propertyId) },
      data: {
        averageRating: averageRating,
        numberOfReviews: numberOfReviews,
      },
    });

    res.status(201).json(newReview);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating review: , ${error.message}` });
  }
};

export const getReviewsByTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params as { cognitoId: string };
    const reviews: (Review & {
      property: Property;
    })[] = await prisma.review.findMany({
      where: {
        tenantCognitoId: cognitoId,
      },
      orderBy: {
        reviewDate: "desc",
      },
      include: {
        property: true,
      },
    });
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving reviews by tenant: , ${error.message}`,
    });
  }
};

export const getPaymentHistoryByProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { propertyId, cognitoId } = req.params as { propertyId: string; cognitoId: string };
    const paymentHistory: PaymentHistory[] = await prisma.paymentHistory.findMany({
      where: {
        propertyId: Number(propertyId),
        tenantCognitoId: cognitoId,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });
    res.status(200).json(paymentHistory);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving payment history by property: , ${error.message}`,
    });
  }
};
