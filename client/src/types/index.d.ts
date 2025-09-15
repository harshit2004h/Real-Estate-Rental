import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { Manager, Tenant, Property, Application } from "./prismaTypes";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
  enum AmenityEnum {
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Dishwasher = "Dishwasher",
    HighSpeedInternet = "HighSpeedInternet",
    HardwoodFloors = "HardwoodFloors",
    WalkInClosets = "WalkInClosets",
    Microwave = "Microwave",
    Refrigerator = "Refrigerator",
    Pool = "Pool",
    Gym = "Gym",
    Parking = "Parking",
    PetsAllowed = "PetsAllowed",
    WiFi = "WiFi",
  }

  enum HighlightEnum {
    HighSpeedInternetAccess = "HighSpeedInternetAccess",
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Heating = "Heating",
    SmokeFree = "SmokeFree",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    DoubleVanities = "DoubleVanities",
    TubShower = "TubShower",
    Intercom = "Intercom",
    SprinklerSystem = "SprinklerSystem",
    RecentlyRenovated = "RecentlyRenovated",
    CloseToTransit = "CloseToTransit",
    GreatView = "GreatView",
    QuietNeighborhood = "QuietNeighborhood",
  }

  enum PropertyTypeEnum {
    Rooms = "Rooms",
    Tinyhouse = "Tinyhouse",
    Apartment = "Apartment",
    Villa = "Villa",
    Townhouse = "Townhouse",
    Cottage = "Cottage",
  }

  interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
  }

  interface ContactWidgetProps {
    onOpenModal: () => void;
    propertyId: number;
  }

  interface ImagePreviewsProps {
    images: string[];
  }

  interface PropertyDetailsProps {
    propertyId: number;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface PropertyLocationProps {
    propertyId: number;
  }

  interface ApplicationCardProps {
    application: Application;
    userType: "manager" | "renter";
    children: React.ReactNode;
  }

  interface CardProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface CardCompactProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
  }

  interface NavbarProps {
    isDashboard: boolean;
  }

  interface AppSidebarProps {
    userType: "manager" | "tenant";
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
    userType: "manager" | "tenant";
  }

  interface User {
    cognitoInfo: AuthUser;
    userInfo: Tenant | Manager;
    userRole: JsonObject | JsonPrimitive | JsonArray;
  }

  interface ApplicationData {
    propertyId: number;
    tenantCognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
    durationMonths: number;
  }

  interface StartPaymentArgs {
    applicationData: ApplicationData;
    onSuccess?: () => void; // The optional success callback for navigation
  }

  interface RazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    offer_id: string | null;
    receipt: string | null;
    status: "created" | "attempted" | "paid";
    attempts: number;
    notes: Record<string, string>;
    created_at: number;
  }

  interface VerifyPaymentArgs {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    applicationData: StartPaymentArgs;
    onSuccess?: () => void;
  }

  interface SecurityDepositPaymentData {
    propertyId: number;
    tenantCognitoId: string;
  }

  interface StartSecurityDepositPaymentArgs {
    paymentData: SecurityDepositPaymentData;
    onSuccess?: () => void;
  }

  interface VerifySecurityDepositPaymentArgs {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    paymentData: SecurityDepositPaymentData;
    onSuccess?: () => void;
  }
}

export {};
