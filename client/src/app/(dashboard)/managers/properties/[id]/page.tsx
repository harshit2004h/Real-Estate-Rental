"use client";

import Headers from "@/components/Headers";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetPaymentsQuery,
  useGetPropertyLeasesQuery,
  useGetPropertyQuery,
} from "@/state/api";
import {
  ArrowDownToLine,
  ArrowLeft,
  Check,
  Download,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PropertyLeases = () => {
  const { id } = useParams();
  const propertyId = Number(id);

  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: leases, isLoading: leasesLoading } =
    useGetPropertyLeasesQuery(propertyId);
  const { data: payments, isLoading: paymentsLoading } =
    useGetPaymentsQuery(propertyId);

  if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;

  const getCurrentMonthPaymentStatus = (leaseId: number) => {
    if (!payments || payments.length === 0) return "Not Paid";

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthPayment = payments.find(
      (payment) =>
        payment.leaseId === leaseId &&
        new Date(payment.dueDate).getMonth() === currentMonth &&
        new Date(payment.dueDate).getFullYear() === currentYear
    );

    return currentMonthPayment?.paymentStatus || "Not Paid";
  };

  const isLeaseActive = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
                This property doesn't have any active leases yet.
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
                    <TableHead>Current Month Payment</TableHead>
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
                      <TableRow key={lease.id} className="h-24">
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
                          ${lease.rent?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center ${
                              paymentStatus === "Paid"
                                ? "bg-green-100 text-green-800"
                                : paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {paymentStatus === "Paid" && (
                              <Check className="w-3 h-3 mr-1" />
                            )}
                            {paymentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {lease.tenant?.phoneNumber || "No phone"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <button className="border border-gray-300 text-gray-700 py-2 px-3 rounded-md flex items-center justify-center text-sm font-medium hover:bg-primary-700 hover:text-primary-50 transition-colors">
                            <ArrowDownToLine className="w-4 h-4 mr-1" />
                            Agreement
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
