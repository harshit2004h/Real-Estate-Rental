import { CustomFormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ApplicationFormData, applicationSchema } from "@/lib/schemas";
import {
  useGetAuthUserQuery,
  useCreateApplicationPaymentMutation,
} from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ApplicationModal = ({
  isOpen,
  onClose,
  propertyId,
}: ApplicationModalProps) => {
  const router = useRouter();
  const [createApplicationPayment, { isLoading, error: apiError }] =
    useCreateApplicationPaymentMutation();
  const { data: authUser } = useGetAuthUserQuery();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      durationMonths: 12,
      message: "",
    },
  });

  // Update form values when authUser changes
  React.useEffect(() => {
    if (authUser) {
      form.reset({
        name: authUser.userInfo?.name || "",
        email: authUser.cognitoInfo?.signInDetails?.loginId || "",
        phoneNumber: authUser.userInfo?.phoneNumber || "",
        durationMonths: 12,
        message:
          "I am very interested in this property and would like to apply.",
      });
    }
  }, [authUser, form]);

  const onSubmit = async (data: ApplicationFormData) => {
    if (!authUser || authUser.userRole !== "tenant") {
      console.error(
        "You must be logged in as a tenant to submit an application"
      );
      return;
    }

    if (!authUser?.cognitoInfo?.userId) {
      console.error("User not authenticated");
      return;
    }

    const handleSuccessNavigation = () => {
      onClose();
      router.push("/tenants/applications");
    };

    await createApplicationPayment({
      applicationData: {
        propertyId: propertyId,
        tenantCognitoId: authUser.cognitoInfo.userId,
        ...data,
      },
      onSuccess: handleSuccessNavigation,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="mb-4">
          <DialogTitle>Submit Application for this Property</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your full name"
            />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
            />
            <CustomFormField
              name="durationMonths"
              label="Desired Lease Duration (Months)"
              type="number"
              placeholder="Enter lease duration in months"
            />
            <CustomFormField
              name="message"
              label="Message"
              type="textarea"
              placeholder="Enter any additional information"
            />
            {apiError && (
              <p className="text-sm text-red-600">
                An error occurred during payment. Please try again.
              </p>
            )}
            <Button
              type="submit"
              className="bg-primary-700 text-white w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing Payment..."
                : "Proceed to Pay Application Fee"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
