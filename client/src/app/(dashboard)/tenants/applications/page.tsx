"use client";

import ApplicationCard from "@/components/ApplicationCard";
import Headers from "@/components/Headers";
import Loading from "@/components/Loading";
import {
  useGetApplicationsQuery,
  useGetAuthUserQuery,
  useCreateSecurityDepositAndFirstMonthPaymentMutation,
  useGetPaymentHistoryByPropertyQuery,
} from "@/state/api";
import { CircleCheckBig, Clock, Download, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Component to handle individual application payment status
const ApplicationWithPaymentStatus = ({
  application,
  authUser,
  handlePaySecurityDeposit,
  isPaymentLoading,
}: {
  application: any;
  authUser: any;
  handlePaySecurityDeposit: (application: any) => void;
  isPaymentLoading: boolean;
}) => {
  // Get payment history for this specific application
  const { data: paymentHistory } = useGetPaymentHistoryByPropertyQuery(
    {
      propertyId: application.propertyId,
      cognitoId: authUser?.cognitoInfo?.userId || "",
    },
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  // Check if security deposit has been paid
  const hasSecurityDepositPaid =
    paymentHistory?.some((payment) => payment.type === "SECURITY_DEPOSIT") ||
    false;

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

        {application.status === "Approved" && !hasSecurityDepositPaid ? (
          <button
            onClick={() => handlePaySecurityDeposit(application)}
            disabled={isPaymentLoading}
            className={`bg-white border border-gray-300 text-gray-700 py-2 px-4 font-semibold
                 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50
                 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPaymentLoading
              ? "Processing..."
              : "Pay Security + First Month's Rent"}
          </button>
        ) : application.status === "Approved" && hasSecurityDepositPaid ? (
          <div className="bg-blue-100 p-4 text-blue-700 flex items-center">
            <CircleCheckBig className="w-5 h-5 mr-2" />
            Security deposit paid
          </div>
        ) : (
          <></>
        )}
      </div>
    </ApplicationCard>
  );
};

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

  const [createSecurityDepositPayment, { isLoading: isPaymentLoading }] =
    useCreateSecurityDepositAndFirstMonthPaymentMutation();

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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
        {sortedApplications.map((application) => (
          <ApplicationWithPaymentStatus
            key={application.id}
            application={application}
            authUser={authUser}
            handlePaySecurityDeposit={handlePaySecurityDeposit}
            isPaymentLoading={isPaymentLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Applications;
