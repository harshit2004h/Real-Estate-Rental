"use client";

import Headers from "@/components/Headers";
import Loading from "@/components/Loading";
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
  useGetPropertyLeasesQuery,
  useGetPropertyQuery,
  useCheckNextMonthPaymentQuery,
  useGetPropertyPaymentHistoryQuery,
  useGetApplicationByIdQuery,
} from "@/state/api";
import {
  ArrowDownToLine,
  ArrowLeft,
  Check,
  Download,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const LeaseRow = ({
  lease,
  property,
  paymentStatus,
  leaseActive,
  formatDate,
  onDownloadAgreement,
}: {
  lease: any;
  property: any;
  paymentStatus: string;
  leaseActive: boolean;
  formatDate: (date: string) => string;
  onDownloadAgreement: (leaseId: number) => void;
}) => {
  const { data: nextMonthPayment, isLoading: nextMonthLoading } =
    useCheckNextMonthPaymentQuery(lease.id);

  const getNextMonthPaymentStatus = () => {
    if (nextMonthLoading) return "Loading...";
    if (!nextMonthPayment) return "Unknown";
    return nextMonthPayment.nextMonthPaid ? "Paid" : "Not Paid";
  };

  const nextMonthStatus = getNextMonthPaymentStatus();

  return (
    <TableRow className="h-24">
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <div className="font-semibold">
              {lease.tenant?.name || "Unknown Tenant"}
            </div>
            <div className="text-sm text-gray-500">
              {lease.tenant?.email || "No email"}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div>{formatDate(lease.startDate)}</div>
          <div className="text-gray-500">to</div>
          <div>{formatDate(lease.endDate)}</div>
        </div>
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            leaseActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {leaseActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell className="font-semibold">
        ${property?.pricePerMonth?.toFixed(2) || "0.00"}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center ${
            nextMonthStatus === "Paid"
              ? "bg-green-100 text-green-800"
              : nextMonthStatus === "Loading..."
              ? "bg-gray-100 text-gray-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {nextMonthStatus === "Paid" && <Check className="w-3 h-3 mr-1" />}
          {nextMonthStatus}
        </span>
      </TableCell>
      <TableCell>
        <div className="text-sm">{lease.tenant?.phoneNumber || "No phone"}</div>
      </TableCell>
      <TableCell>
        <button
          onClick={() => onDownloadAgreement(lease.id)}
          className="border border-gray-300 text-gray-700 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary-700 hover:text-primary-50 transition-colors"
        >
          <ArrowDownToLine className="w-4 h-4 mr-1" />
          Agreement
        </button>
      </TableCell>
    </TableRow>
  );
};

const PropertyLeases = () => {
  const { id } = useParams();
  const propertyId = Number(id);

  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: leases, isLoading: leasesLoading } =
    useGetPropertyLeasesQuery(propertyId);
  const { data: paymentHistory, isLoading: paymentHistoryLoading } =
    useGetPropertyPaymentHistoryQuery(propertyId);

  if (propertyLoading || leasesLoading || paymentHistoryLoading)
    return <Loading />;

  const getCurrentMonthPaymentStatus = (leaseId: number) => {
    return "Check Payment History";
  };

  const isLeaseActive = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownloadAgreement = async (leaseId: number) => {
    try {
      // Find the lease first
      const lease = leases?.find((l) => l.id === leaseId);
      if (!lease) {
        console.error("Lease not found");
        toast.error("Lease not found. Please try again.");
        return;
      }

      // Check if we have all required data
      if (!lease.tenant) {
        console.error("Tenant data not found for this lease");
        toast.error(
          "Tenant information is missing. Cannot generate agreement."
        );
        return;
      }

      if (!property) {
        console.error("Property data not found");
        toast.error(
          "Property information is missing. Cannot generate agreement."
        );
        return;
      }

      if (!property.manager) {
        console.error("Manager data not found for this property");
        toast.error(
          "Manager information is missing. Cannot generate agreement."
        );
        return;
      }

      if (!property.location) {
        console.error("Location data not found for this property");
        toast.error(
          "Property location information is missing. Cannot generate agreement."
        );
        return;
      }

      // Show loading toast
      toast.loading("Generating rental agreement...", {
        id: `download-${leaseId}`,
      });

      // Create the application object with all necessary data for the PDF
      const applicationData = {
        id: lease.id,
        tenant: {
          name: lease.tenant.name || "Unknown Tenant",
          email: lease.tenant.email || "",
          phoneNumber: lease.tenant.phoneNumber || "",
        },
        property: {
          name: property.name || "Unknown Property",
          pricePerMonth: property.pricePerMonth || 0,
          securityDeposit: property.securityDeposit || 0,
          location: {
            city: property.location.city || "",
            state: property.location.state || "",
            country: property.location.country || "",
            postalCode: property.location.postalCode || "",
          },
        },
        manager: {
          name: property.manager.name || "Unknown Manager",
          email: property.manager.email || "",
          phoneNumber: property.manager.phoneNumber || "",
        },
        lease: {
          startDate: lease.startDate,
          endDate: lease.endDate,
        },
        status: "Approved" as const,
        createdAt: lease.createdAt || new Date().toISOString(),
        updatedAt: lease.updatedAt || new Date().toISOString(),
      };

      // Call the download function
      downloadAgreement(applicationData);

      // Show success toast
      toast.success(`Agreement downloaded for ${lease.tenant.name}`, {
        id: `download-${leaseId}`,
      });
    } catch (error) {
      console.error("Error downloading agreement:", error);
      toast.error(
        "An error occurred while generating the agreement. Please try again.",
        { id: `download-${leaseId}` }
      );
    }
  };

  const handleDownloadAllAgreements = async () => {
    if (!leases || leases.length === 0) {
      toast.error("No leases found to download agreements for.");
      return;
    }

    try {
      toast.loading(`Generating ${leases.length} rental agreements...`, {
        id: "download-all",
      });

      for (const lease of leases) {
        await handleDownloadAgreement(lease.id);
        // Add a small delay between downloads to prevent overwhelming the browser
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      toast.success(
        `Successfully downloaded ${leases.length} rental agreements!`,
        { id: "download-all" }
      );
    } catch (error) {
      console.error("Error downloading all agreements:", error);
      toast.error(
        "An error occurred while generating agreements. Please try again.",
        { id: "download-all" }
      );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Back to properties page */}
      <Link
        href="/managers/properties"
        className="flex items-center mb-4 hover:text-primary-500"
        scroll={false}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Back to Properties</span>
      </Link>

      <Headers
        title={property?.name || "Property Details"}
        subtitle="Manage tenants and leases for this property"
      />

      <div className="w-full space-y-6">
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Property Leases</h2>
              <p className="text-sm text-gray-500">
                {leases?.length || 0} lease(s) found for this property
              </p>
            </div>
            <div>
              <button
                onClick={handleDownloadAllAgreements}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50 disabled:opacity-50"
                disabled={!leases || leases.length === 0}
              >
                <Download className="w-5 h-5 mr-2" />
                <span>Download All</span>
              </button>
            </div>
          </div>
          <hr className="mt-4 mb-1" />

          {!leases || leases.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No leases found
              </h3>
              <p className="text-gray-500">
                This property doesn&apos;t have any active leases yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Lease Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Next Month Payment</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leases.map((lease) => {
                    const paymentStatus = getCurrentMonthPaymentStatus(
                      lease.id
                    );
                    const leaseActive = isLeaseActive(
                      lease.startDate,
                      lease.endDate
                    );

                    return (
                      <LeaseRow
                        key={lease.id}
                        lease={lease}
                        property={property}
                        paymentStatus={paymentStatus}
                        leaseActive={leaseActive}
                        formatDate={formatDate}
                        onDownloadAgreement={handleDownloadAgreement}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Payment History Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Payment History</h2>
              <p className="text-sm text-gray-500">
                {paymentHistory?.length || 0} payment(s) found for this property
              </p>
            </div>
          </div>
          <hr className="mt-4 mb-1" />

          {!paymentHistory || paymentHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                💳
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No payment history found
              </h3>
              <p className="text-gray-500">
                This property doesn&apos;t have any payment records yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment: any) => (
                    <TableRow key={payment.id} className="h-16">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {payment.tenant?.name || "Unknown Tenant"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.tenant?.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {payment.paymentDate
                            ? formatDate(payment.paymentDate)
                            : "No date"}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${payment.amount?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            payment.type === "RENT"
                              ? "bg-blue-100 text-blue-800"
                              : payment.type === "SECURITY_DEPOSIT"
                              ? "bg-green-100 text-green-800"
                              : payment.type === "APPLICATION_FEE"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {payment.type?.replace("_", " ") || "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-mono">
                          {payment.transactionId ? (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {payment.transactionId.length > 16
                                ? `${payment.transactionId.substring(0, 16)}...`
                                : payment.transactionId}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyLeases;
