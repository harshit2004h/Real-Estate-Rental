"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Headers from "@/components/Headers";
import Loading from "@/components/Loading";
import { useGetApplicationsQuery, useGetAuthUserQuery, useCreateSecurityDepositAndFirstMonthPaymentMutation, useGetLeasesQuery, useGetPaymentsQuery } from "@/state/api";
import { CircleCheckBig, Clock, Download, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Applications = () => {
  const router = useRouter();
  const { data: authUser } = useGetAuthUserQuery();
  const {
    data: applications,
    isLoading,
    isError,
  } = useGetApplicationsQuery({
    userId: authUser?.cognitoInfo?.userId,
    userType: "tenant",
  });

  // Get all leases for the current user to check for active leases
  const { data: leases } = useGetLeasesQuery(
    parseInt(authUser?.cognitoInfo?.userId || "0"),
    { skip: !authUser?.cognitoInfo?.userId }
  );

  const [createSecurityDepositPayment, { isLoading: isPaymentLoading }] = useCreateSecurityDepositAndFirstMonthPaymentMutation();

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Helper function to check if lease exists and payment status
  const getApplicationStatus = (application: any) => {
    if (!leases || !authUser?.cognitoInfo?.userId) return { hasActiveLease: false, hasPayment: false };

    // Find active lease for this tenant and property
    const activeLease = leases.find(
      (lease) => 
        lease.tenantCognitoId === authUser.cognitoInfo.userId &&
        lease.propertyId === application.propertyId &&
        lease.status === "ACTIVE"
    );

    return {
      hasActiveLease: !!activeLease,
      lease: activeLease,
      hasPayment: false // We'll determine this later when we have access to payments
    };
  };

  const handlePaySecurityDeposit = async (application: any) => {
    if (!authUser?.cognitoInfo?.userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      await createSecurityDepositPayment({
        paymentData: {
          propertyId: application.propertyId,
          tenantCognitoId: authUser.cognitoInfo.userId,
        },
        onSuccess: () => {
          router.push("/tenants/residences");
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  // Component to handle payment button logic
  const PaymentButton = ({ application, hasActiveLease, lease, onPayment, isPaymentLoading }: any) => {
    // Check if payments exist for this lease to determine if already paid
    const { data: payments } = useGetPaymentsQuery(
      lease?.id || 0,
      { skip: !lease?.id }
    );

    // Check if any payment exists for this lease (indicating security deposit was paid)
    const hasPayment = payments && payments.length > 0;

    // Button should be disabled if:
    // 1. No active lease exists (lease not created yet)
    // 2. Payment has already been made
    const isDisabled = !hasActiveLease || hasPayment || isPaymentLoading;

    let buttonText = "Pay Security + First Month's Rent";
    if (isPaymentLoading) {
      buttonText = "Processing...";
    } else if (!hasActiveLease) {
      buttonText = "Lease Not Active";
    } else if (hasPayment) {
      buttonText = "Already Paid";
    }

    return (
      <button
        onClick={() => onPayment(application)}
        disabled={isDisabled}
        className={`bg-white border border-gray-300 text-gray-700 py-2 px-4 font-semibold
             rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50
             disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {buttonText}
      </button>
    );
  };

  if (isLoading) return <Loading />;
  if (isError || !applications) return <div>Error fetching applications</div>;

  const sortedApplications = applications.slice().sort((a, b) => {
    const dateA = new Date(a.applicationDate).getTime();
    const dateB = new Date(b.applicationDate).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="dashboard-container">
      <Headers
        title="Applications"
        subtitle="Track and manage your property rental applications"
      />

      {/* Sort Dropdown aligned right */}
      <div className="flex justify-end mt-4 mb-6">
        <label
          htmlFor="sortOrder"
          className="font-medium text-gray-700 mr-3 self-center"
        >
          Sort by Time:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="w-full">
        {sortedApplications.map((application) => {
          const applicationStatus = getApplicationStatus(application);
          const { hasActiveLease, lease } = applicationStatus;
          
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              userType="renter"
            >
              <div className="flex justify-between gap-5 w-full pb-4 px-4">
                {application.status === "Approved" ? (
                  <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                    <CircleCheckBig className="w-5 h-5 mr-2" />
                    Your application has been approved.
                  </div>
                ) : application.status === "Pending" ? (
                  <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Your application is pending approval
                  </div>
                ) : (
                  <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Your application has been denied
                  </div>
                )}

                {application.status === "Approved" ? (
                  <PaymentButton
                    application={application}
                    hasActiveLease={hasActiveLease}
                    lease={lease}
                    onPayment={handlePaySecurityDeposit}
                    isPaymentLoading={isPaymentLoading}
                  />
                ) : (
                  <></>
                )}
              </div>
            </ApplicationCard>
          );
        })}
      </div>
    </div>
  );
};

export default Applications;
