import { Request, Response } from "express";
import { PrismaClient, Lease, Tenant, Property } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getLeases = async (req: Request, res: Response): Promise<void> => {
  try {
    const leases: (Lease & {
      tenant: Tenant;
      property: Property;
    })[] = await prisma.lease.findMany({
      include: {
        tenant: true,
        property: true,
      },
    });
    res.json(leases);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving leases: , ${error.message}` });
  }
};

export const getLeaseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const lease: (Lease & {
      tenant: Tenant;
      property: Property;
    }) | null = await prisma.lease.findUnique({
      where: { id: Number(id) },
      include: {
        tenant: true,
        property: true,
      },
    });

    if (lease) {
      res.json(lease);
    } else {
      res.status(404).json({ message: "Lease not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving lease: , ${error.message}` });
  }
};
