"use client";

import Loading from "@/components/Loading";
import ManagerDetailsDialog from "@/components/ManagerDetailsDialog";
import { downloadAgreement } from "@/components/downloadAgreement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useGetAuthUserQuery,
  useGetLeasesQuery,
  useGetPropertyQuery,
  useChargeSubscriptionMutation,
  useCheckNextMonthPaymentQuery,
  useGetPaymentHistoryByPropertyQuery,
  useGetApplicationByPropertyAndTenantQuery,
} from "@/state/api";
import { Lease, PaymentHistory, Property, Application } from "@/types/prismaTypes";
import {
  ArrowDownToLineIcon,
  Check,
  CreditCard,
  Download,
  Edit,
  FileText,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const PaymentMethod = ({ currentLease }: { currentLease?: Lease }) => {
  const nextPaymentDate = new Date();
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

  const [chargeSubscription, { isLoading: isPaymentLoading }] =
    useChargeSubscriptionMutation();

  const { data: paymentStatus, refetch: refetchPaymentStatus } =
    useCheckNextMonthPaymentQuery(currentLease?.id || 0, {
      skip: !currentLease?.id,
    });

  const handlePaySubscription = async () => {
    if (!currentLease?.id) return;

    try {
      await chargeSubscription({ leaseId: currentLease.id }).unwrap();
      // Refetch payment status after successful payment
      setTimeout(() => refetchPaymentStatus(), 2000);
    } catch (error) {
      console.error("Subscription payment failed:", error);
    }
  };

  const isNextMonthPaid = paymentStatus?.nextMonthPaid || false;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mt-10 md:mt-0 flex-1">
      <h2 className="text-2xl font-bold mb-4">Subscription Payment</h2>
      <p className="mb-4">
        Monthly subscription with manual approval required.
      </p>
      <div className="border rounded-lg p-6">
        <div>
          {/* Subscription Status Info */}
          <div className="flex gap-10">
            <div
              className={`w-36 h-20 flex items-center justify-center rounded-md ${
                isNextMonthPaid ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <span className="text-white text-lg font-bold">
                {isNextMonthPaid ? "PAID" : "SUB"}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-5">
                  <h3 className="text-lg font-semibold">Active Subscription</h3>
                  <span
                    className={`text-sm font-medium border px-3 py-1 rounded-full ${
                      isNextMonthPaid
                        ? "border-green-700 text-green-700"
                        : "border-blue-700 text-blue-700"
                    }`}
                  >
                    {isNextMonthPaid ? "Next Month Paid" : "Payment Required"}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <CreditCard className="w-4 h-4 mr-1" />
                  <span>
                    Subscription payment for •{" "}
                    {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>Manual approval required for each payment</span>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <div className="flex justify-end gap-2">
            <button
              onClick={handlePaySubscription}
              disabled={isNextMonthPaid || isPaymentLoading}
              className={`py-2 px-4 rounded-md flex items-center justify-center border transition-colors ${
                isNextMonthPaid || isPaymentLoading
                  ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-primary-700 hover:text-primary-50"
              }`}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              <span>
                {isPaymentLoading
                  ? "Processing..."
                  : isNextMonthPaid
                  ? "Next Month Paid"
                  : "Pay Subscription"}
              </span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50">
                  <Edit className="w-5 h-5 mr-2" />
                  <span>View Subscription</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Subscription Details</DialogTitle>
                  <DialogDescription>
                    View your active subscription. Manual approval is required
                    for each payment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Subscription ID:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {currentLease?.razorpaySubscriptionId || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Plan ID:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {currentLease?.razorpayPlanId || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Status:</span>
                    <span className="col-span-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active (Manual Approval)
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Current Payment:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {isNextMonthPaid ? "Next Month Paid" : "Pending Approval"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Payment Method:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      Subscription with manual approval
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Duration:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {currentLease?.durationMonths || 0} months
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Start Date:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {currentLease
                        ? new Date(currentLease.startDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">End Date:</span>
                    <span className="col-span-2 text-sm text-gray-600">
                      {currentLease
                        ? new Date(currentLease.endDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidenceCard = ({
  property,
  currentLease,
  authUser,
  application,
}: {
  property: Property;
  currentLease: Lease;
  authUser: any;
  application?: Application | null;
}) => {
  const handleDownloadAgreement = () => {
    try {
      // Ensure we have all required data
      if (!property || !currentLease || !authUser) {
        console.error("Missing required data for generating agreement");
        return;
      }

      if (!application) {
        console.error("No application found for this property and tenant");
        return;
      }

      // Create the application object with lease data for the downloadAgreement function
      const applicationWithLease = {
        ...application,
        lease: currentLease
      };

      downloadAgreement(applicationWithLease);
    } catch (error) {
      console.error("Error downloading agreement:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex-1 flex flex-col justify-between">
      {/* Header */}
      <div className="flex gap-5">
        <div className="w-64 h-32 relative rounded-xl overflow-hidden">
          <Image
            src="/placeholder.jpg"
            alt="Property"
            fill
            className="object-cover"
            priority={true}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="bg-green-500 w-fit text-white px-4 py-1 rounded-full text-sm font-semibold">
              Active Leases
            </div>

            <h2 className="text-2xl font-bold my-2">{property.name}</h2>
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 mr-1" />
              <span>
                {property.location.city}, {property.location.country}
              </span>
            </div>
          </div>
          <div className="text-xl font-bold">
            ${property.pricePerMonth}{" "}
            <span className="text-gray-500 text-sm font-normal">/ month</span>
          </div>
        </div>
      </div>
      {/* Dates */}
      <div>
        <hr className="my-4" />
        <div className="flex justify-around items-center">
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">Start Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.startDate).toLocaleDateString("en-GB")}
            </div>
          </div>
          <div className="border-[0.5px] border-primary-300 h-4" />
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">End Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.endDate).toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-2 w-full">
        {property.manager ? (
          <ManagerDetailsDialog manager={property.manager}>
            <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50">
              <User className="w-5 h-5 mr-2" />
              Manager
            </button>
          </ManagerDetailsDialog>
        ) : (
          <button
            className="bg-gray-100 border border-gray-300 text-gray-400 py-2 px-4 rounded-md flex items-center justify-center cursor-not-allowed"
            disabled
          >
            <User className="w-5 h-5 mr-2" />
            Manager Info Unavailable
          </button>
        )}
        {application ? (
          <button 
            onClick={handleDownloadAgreement}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Agreement
          </button>
        ) : (
          <button
            className="bg-gray-100 border border-gray-300 text-gray-400 py-2 px-4 rounded-md flex items-center justify-center cursor-not-allowed"
            disabled
            title="Application data not available"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Agreement
          </button>
        )}
      </div>
    </div>
  );
};

const BillingHistory = ({
  paymentHistory,
}: {
  paymentHistory: PaymentHistory[];
}) => {
  const formatPaymentType = (type: string) => {
    switch (type) {
      case "RENT":
        return "Monthly Rent";
      case "SECURITY_DEPOSIT":
        return "Security Deposit";
      case "APPLICATION_FEE":
        return "Application Fee";
      case "OTHER":
        return "Other";
      default:
        return type;
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "RENT":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "SECURITY_DEPOSIT":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "APPLICATION_FEE":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "OTHER":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Billing History</h2>
          <p className="text-sm text-gray-500">
            Download your previous plan receipts and usage details.
          </p>
        </div>
        <div>
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50">
            <Download className="w-5 h-5 mr-2" />
            <span>Download All</span>
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-1" />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment: PaymentHistory) => (
              <TableRow key={payment.id} className="h-16">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Invoice #{payment.id} -{" "}
                    {(() => {
                      const paymentMonth = new Date(payment.paymentDate);
                      return paymentMonth.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      });
                    })()}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPaymentTypeColor(
                      payment.type
                    )}`}
                  >
                    {formatPaymentType(payment.type) == "Security Deposit"
                      ? "Security & First Month Deposit"
                      : formatPaymentType(payment.type)}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-800 border-green-300`}
                  >
                    <Check className="w-4 h-4 inline-block mr-1" />
                    Paid
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50">
                    <ArrowDownToLineIcon className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Residence = () => {
  const { id } = useParams();
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyQuery(Number(id));

  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(
    parseInt(authUser?.cognitoInfo?.userId || "0"),
    { skip: !authUser?.cognitoInfo?.userId }
  );

  const currentLease = leases?.find(
    (lease) => lease.propertyId === property?.id
  );

  const { data: application, isLoading: applicationLoading } = 
    useGetApplicationByPropertyAndTenantQuery(
      {
        propertyId: Number(id),
        tenantCognitoId: authUser?.cognitoInfo?.userId || "",
      },
      { skip: !authUser?.cognitoInfo?.userId || !id }
    );

  const { data: paymentHistory, isLoading: paymentHistoryLoading } =
    useGetPaymentHistoryByPropertyQuery(
      {
        propertyId: Number(id),
        cognitoId: authUser?.cognitoInfo?.userId || "",
      },
      { skip: !authUser?.cognitoInfo?.userId || !id }
    );

  if (propertyLoading || leasesLoading || paymentHistoryLoading || applicationLoading)
    return <Loading />;
  if (!property || propertyError) return <div>Error loading property</div>;

  return (
    <div className="dashboard-container">
      <div className="w-full mx-auto">
        <div className="md:flex gap-10">
          {currentLease && (
            <ResidenceCard 
              property={property} 
              currentLease={currentLease} 
              authUser={authUser}
              application={application}
            />
          )}
          <PaymentMethod currentLease={currentLease} />
        </div>
        <BillingHistory paymentHistory={paymentHistory || []} />
      </div>
    </div>
  );
};

export default Residence;
