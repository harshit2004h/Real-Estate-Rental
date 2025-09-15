import {
  useGetAuthUserQuery,
  useGetPropertyQuery,
  useGetPaymentHistoryByPropertyQuery,
} from "@/state/api";
import { Phone, CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const ContactWidget = ({ onOpenModal, propertyId }: ContactWidgetProps) => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: property } = useGetPropertyQuery(propertyId);

  // Get payment history to check if application fee has been paid
  const { data: paymentHistory } = useGetPaymentHistoryByPropertyQuery(
    {
      propertyId: propertyId,
      cognitoId: authUser?.cognitoInfo?.userId || "",
    },
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const router = useRouter();

  // Check if application fee has already been paid
  const hasApplicationFeePaid =
    paymentHistory?.some((payment) => payment.type === "APPLICATION_FEE") ||
    false;

  const handleButtonClick = () => {
    if (authUser) {
      if (!hasApplicationFeePaid) {
        onOpenModal();
      }
    } else {
      router.push("/signin");
    }
  };

  // Get manager phone number or default message
  const managerPhone = property?.manager?.phoneNumber;
  const displayPhone = managerPhone || "No contact details available";

  return (
    <div className="bg-white border border-primary-200 rounded-2xl p-7 h-fit min-w-[300px] mb-5">
      {/* Contact Property */}
      <div className="flex items-center gap-5 mb-4 border border-primary-200 p-4 rounded-xl">
        <div className="flex items-center p-4 bg-primary-900 rounded-full">
          <Phone className="text-primary-50" size={15} />
        </div>
        <div>
          <p>Contact This Property</p>
          <div className="text-lg font-bold text-primary-800">
            {displayPhone}
          </div>
        </div>
      </div>

      {authUser && hasApplicationFeePaid ? (
        <div className="w-full bg-green-100 text-green-700 p-3 rounded-md flex items-center justify-center gap-2">
          <CircleCheckBig className="w-5 h-5" />
          Application already submitted
        </div>
      ) : (
        <Button
          className="w-full bg-primary-700 text-white hover:bg-primary-600"
          onClick={handleButtonClick}
        >
          {authUser ? "Submit Application" : "Sign In to Apply"}
        </Button>
      )}

      <hr className="my-4" />
      <div className="text-sm">
        <div className="text-primary-600 mb-1">Language: English, Bahasa.</div>
        <div className="text-primary-600">
          Open by appointment on Monday - Sunday
        </div>
      </div>
    </div>
  );
};

export default ContactWidget;
