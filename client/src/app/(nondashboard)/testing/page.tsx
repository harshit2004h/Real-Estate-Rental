'use client'; // This directive is necessary for components using hooks

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateApplicationPaymentMutation, useGetAuthUserQuery } from '@/state/api';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

/**
 * Zod schema for form validation.
 */
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  durationMonths: z.coerce.number().int().min(1, { message: "Duration must be at least 1 month." }),
  message: z.string().min(1, { message: "Please enter a message." }),
});

type FormData = z.infer<typeof applicationSchema>;

/**
 * A simple application form component that integrates with the
 * Razorpay payment flow defined in your RTK Query API slice.
 * Now with react-hook-form and Zod for robust validation.
 */
export default function ApplicationPage() {
  // Use Next.js router for navigation
  const router = useRouter();
  
  // Get authenticated user data
  const { data: authUser, isLoading: authLoading, error: authError } = useGetAuthUserQuery();
  
  const [createApplicationPayment, { isLoading, error: apiError }] = useCreateApplicationPaymentMutation();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: authUser?.userInfo?.name || 'John Doe',
      email: authUser?.cognitoInfo?.signInDetails?.loginId || 'john.doe@example.com',
      phoneNumber: authUser?.userInfo?.phoneNumber || '9876543210',
      durationMonths: 12,
      message: 'I am very interested in this property and would like to apply.',
    }
  });

  // Reset form with user data when authUser changes
  React.useEffect(() => {
    if (authUser) {
      reset({
        name: authUser.userInfo?.name || 'John Doe',
        email: authUser.cognitoInfo?.signInDetails?.loginId || 'john.doe@example.com',
        phoneNumber: authUser.userInfo?.phoneNumber || '9876543210',
        durationMonths: 12,
        message: 'I am very interested in this property and would like to apply.',
      });
    }
  }, [authUser, reset]);

  /**
   * Handles the form submission process.
   * @param {FormData} data - The validated form data from react-hook-form.
   */
  const onSubmit = async (data: FormData) => {
    // Check if user is authenticated
    if (!authUser?.cognitoInfo?.userId) {
      console.error('User not authenticated');
      return;
    }

    const handleSuccessNavigation = () => {
      // Use Next.js router for navigation
      router.push('/tenants/applications');
    };

    await createApplicationPayment({
      applicationData: {
        propertyId: 1, // Use property ID 2 as requested
        tenantCognitoId: authUser.cognitoInfo.userId, // Use actual user's Cognito ID
        ...data,
      },
      onSuccess: handleSuccessNavigation,
    });
  };

  // Show loading state while fetching user data
  if (authLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  // Show error state if user data fetch failed
  if (authError || !authUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <p className="text-red-600">Please log in to submit an application.</p>
          <button 
            onClick={() => router.push('/auth/login')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Apply for Property</h1>
          <p className="mt-2 text-gray-600">Complete the form below to submit your application for Property ID: 2</p>
          {authUser && (
            <p className="mt-1 text-sm text-blue-600">
              Logged in as: {authUser.cognitoInfo?.signInDetails?.loginId || authUser.userInfo?.name}
            </p>
          )}
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input {...field} id="name" type="text" className={`w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
              )}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input {...field} id="email" type="email" className={`w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
              )}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
             <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <input {...field} id="phoneNumber" type="tel" className={`w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
              )}
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
          </div>
          
          {/* Lease Duration Field */}
          <div>
            <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-700">Desired Lease Duration (Months)</label>
            <Controller
              name="durationMonths"
              control={control}
              render={({ field }) => (
                 <input {...field} id="durationMonths" type="number" min="1" className={`w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 ${errors.durationMonths ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
              )}
            />
            {errors.durationMonths && <p className="mt-1 text-sm text-red-600">{errors.durationMonths.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea {...field} id="message" rows={4} className={`w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}></textarea>
              )}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          
          {apiError && <p className="text-sm text-red-600">An error occurred during payment. Please try again.</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {isLoading ? 'Processing Payment...' : 'Proceed to Pay Application Fee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

