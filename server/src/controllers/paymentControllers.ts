import Razorpay from "razorpay";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
});

if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
  throw new Error("Razorpay credentials are not configured properly");
}

// for application fees
export const capturePayment1 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId, tenantCognitoId } = req.body;

    if (!propertyId || !tenantCognitoId) {
      res
        .status(400)
        .json({ message: "propertyId and tenantCognitoId are required" });
      return;
    }

    let property;
    try {
      property = await prisma.property.findUnique({
        where: { id: propertyId },
      });
      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      //check active lease of tenant
      const activeLease = await prisma.lease.findFirst({
        where: {
          propertyId: propertyId,
          tenant: {
            cognitoId: tenantCognitoId,
          },
          status: "ACTIVE",
        },
      });

      if (activeLease) {
        res.status(400).json({
          message: "Tenant already has an active lease for this property",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving property" });
      return;
    }

    //check if application already exists
    try {
      let application = await prisma.application.findFirst({
        where: {
          propertyId: Number(propertyId),
          tenantCognitoId: tenantCognitoId,
        },
      });

      if (application) {
        res
          .status(400)
          .json({ message: "Application already exists for this property" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error checking existing application" });
      return;
    }

    const amount = property.applicationFee * 100;
    const currency = "INR";
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_order_${Math.random() * 1000}`,
      notes: {
        propertyId: propertyId,
        tenantCognitoId: tenantCognitoId,
        purchaseType: "APPLICATION_FEE",
        purchaseDateTime: new Date().toISOString(),
      },
    } as any; // Type assertion to fix Razorpay type issues

    try {
      //initiate razorpay payment
      const order = await instance.orders.create(options);
      console.log(order);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating payment order 1" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error capturing payment 1" });
  }
};

// verifying for application fees
export const verifyPayment1 = async (req: Request, res: Response): Promise<void> => {
  console.log("verifyPayment1 started");
  console.log("Request body:", req.body);
  
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationData,
    } = req.body;

    console.log("Extracted data:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationData
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log("Missing payment verification data");
      res.status(200).json({ success: false, message: "Payment Failed" });
      return;
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(body.toString())
      .digest("hex");

    console.log("Signature verification:", {
      expected: expectedSignature,
      received: razorpay_signature,
      match: expectedSignature === razorpay_signature
    });

    if (expectedSignature === razorpay_signature) {
      const {
        propertyId,
        tenantCognitoId,
        name,
        email,
        phoneNumber,
        message,
        durationMonths,
      } = applicationData.applicationData; // Fix: access the nested applicationData

      console.log("Creating application with data:", {
        propertyId,
        tenantCognitoId,
        name,
        email,
        phoneNumber,
        message,
        durationMonths,
      });

      // create application
      const newApplication = await prisma.application.create({
        data: {
          applicationDate: new Date(),
          status: "Pending",
          name,
          email,
          phoneNumber,
          message,
          durationMonths,
          property: { connect: { id: Number(propertyId) } },
          tenant: { connect: { cognitoId: tenantCognitoId } },
        },
        include: { property: true, tenant: true },
      });

      console.log("Application created successfully:", newApplication);

      res.status(200).json({
        success: true,
        message: "Payment Verified & Application Created",
        application: newApplication,
      });
    } else {
      console.log("Payment verification failed - signature mismatch");
      res.status(200).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log("Error in verifyPayment1:", error);
    res.status(500).json({ message: "Error verifying payment 1" });
  }
};

// for security deposit and first month rent and plan, subscription from next month
export const capturePayment2 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId, tenantCognitoId } = req.body;

    if (!propertyId || !tenantCognitoId) {
      res
        .status(400)
        .json({ message: "propertyId and tenantCognitoId are required" });
      return;
    }

    let managerCognitoId;
    try {
      managerCognitoId = await prisma.property
        .findUnique({
          where: { id: propertyId },
          select: { managerCognitoId: true },
        })
        .then((property) => property?.managerCognitoId);
        
      if (!managerCognitoId) {
        res.status(404).json({ message: "Property manager not found" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving property manager" });
      return;
    }

    let property;
    try {
      property = await prisma.property.findUnique({
        where: { id: propertyId },
      });

      if (!property) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      //check if tenant has an active lease for the property
      const activeLease = await prisma.lease.findFirst({
        where: {
          propertyId: propertyId,
          tenant: {
            cognitoId: tenantCognitoId,
          },
          status: "ACTIVE",
        },
      });

      if (activeLease) {
        res.status(400).json({
          message: "Tenant already has an active lease for this property",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving property" });
      return;
    }

    const amount =
      property!.pricePerMonth * 100 + property!.securityDeposit * 100;
    const currency = "INR";
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_order_${Math.random() * 1000}`,
      notes: {
        propertyId: propertyId,
        tenantCognitoId: tenantCognitoId,
        managerCognitoId: managerCognitoId,
        purchaseType: "SECURITY_AND_FIRST_MONTH",
        purchaseDateTime: new Date().toISOString(),
      },
    } as any; // Type assertion to fix Razorpay type issues

    try {
      //initiate razorpay payment
      const order = await instance.orders.create(options);
      console.log(order);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating payment order" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error capturing payment" });
  }
};

// verifying for security deposit and first month rent and plan, subscription from next month
export const verifyPayment2 = async (req: Request, res: Response): Promise<void> => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(200).json({ success: false, message: "Payment Failed" });
      return;
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const { propertyId, tenantCognitoId, managerCognitoId } =
        req.body.payload.payment.entity.notes;
      const amount = req.body.payload.payment.entity.amount;

      //get durationMonths from application
      const application = await prisma.application.findFirst({
        where: {
          propertyId: Number(propertyId),
          tenantCognitoId: tenantCognitoId,
        },
        select: {
          durationMonths: true,
        },
      });

      //create razorpay recurring payment plan for monthly rent
      const plan = await instance.plans.create({
        period: "monthly",
        interval: 1,
        item: {
          name: `Monthly Rent for Property ID: ${propertyId}`,
          amount: amount,
          currency: "INR",
          description: `Monthly rent for property ID: ${propertyId} for tenant ${tenantCognitoId}`,
        },
        notes: {
          propertyId: propertyId,
          tenantCognitoId: tenantCognitoId,
          managerCognitoId: managerCognitoId,
          purchaseType: "MONTHLY_RENT_PLAN",
          purchaseDateTime: new Date().toISOString(),
        },
      });

      //get plan id
      const planId = plan.id;

      //create subscription for the tenant
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1);

      const subscription = await instance.subscriptions.create({
        plan_id: planId,
        customer_notify: true,
        total_count: (application?.durationMonths || 12) - 1,
        start_at: Math.floor(startDate.getTime() / 1000),
        notes: {
          propertyId: propertyId,
          tenantCognitoId: tenantCognitoId,
          managerCognitoId: managerCognitoId,
          purchaseType: "MONTHLY_RENT_SUBSCRIPTION",
          purchaseDateTime: new Date().toISOString(),
        },
      });

      //connect property to tenant in the database
      await prisma.property.update({
        where: { id: Number(propertyId) },
        data: {
          tenants: {
            connect: { cognitoId: tenantCognitoId },
          },
        },
      });

      //create lease for the tenant
      const leaseStartDate = new Date();
      const endDate = new Date();
      endDate.setMonth(
        endDate.getMonth() + (application?.durationMonths || 12)
      );
      const newLease = await prisma.lease.create({
        data: {
          startDate: leaseStartDate,
          endDate: endDate,
          durationMonths: application?.durationMonths || 12,
          propertyId: Number(propertyId),
          tenantCognitoId: tenantCognitoId,
          status: "ACTIVE",
          razorpayPlanId: planId,
          razorpaySubscriptionId: subscription.id,
        },
      });

      res.status(200).json({
        success: true,
        message: "Payment Verified and Subscription Created",
        lease: newLease,
        plan: plan,
        subscription: subscription,
      });
    } else {
      res.status(200).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment" });
  }
};
