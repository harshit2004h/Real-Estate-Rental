import { Request, Response } from "express";
import { PrismaClient, Application, Property, Location, Manager, Tenant, ApplicationStatus } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const listApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, userType }: { userId?: string; userType?: string } = req.query;

    let whereClause: any = {};

    if (userId && userType) {
      if (userType === "tenant") {
        whereClause = { tenantCognitoId: String(userId) };
      } else if (userType === "manager") {
        whereClause = {
          property: {
            managerCognitoId: String(userId),
          },
        };
      }
    }

    const applications: (Application & {
      property: Property & {
        location: Location;
        manager: Manager;
      };
      tenant: Tenant;
    })[] = await prisma.application.findMany({
      where: whereClause,
      include: {
        property: {
          include: {
            location: true,
            manager: true,
          },
        },
        tenant: true,
      },
    });

    const formattedApplications = await Promise.all(
      applications.map(async (app) => {
        return {
          ...app,
          property: {
            ...app.property,
            address: app.property.location.address,
          },
          manager: app.property.manager,
        };
      })
    );

    res.json(formattedApplications);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving applications: ${error.message}` });
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const application: (Application & {
      property: Property;
      tenant: Tenant;
    }) | null = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        tenant: true,
      },
    });
    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }
    res.json(application);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving application: ${error.message}` });
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const { status }: { status: ApplicationStatus } = req.body;
    console.log("status:", status);

    const application: (Application & {
      property: Property;
      tenant: Tenant;
    }) | null = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        tenant: true,
      },
    });

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    if (status === "Approved") {
      //change application status to Approved
      await prisma.application.update({
        where: { id: Number(id) },
        data: { status },
      });
    } else {
      // Update the application status (for both "Denied" and other statuses)
      await prisma.application.update({
        where: { id: Number(id) },
        data: { status },
      });
    }

    // Respond with the updated application details
    const updatedApplication: (Application & {
      property: Property;
      tenant: Tenant;
    }) | null = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        tenant: true,
      },
    });

    res.json(updatedApplication);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating application status: ${error.message}` });
  }
};
