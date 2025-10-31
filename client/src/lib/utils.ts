import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { AuthUser } from "aws-amplify/auth";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatEnumString(str: string): string {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function formatPriceValue(value: number | null, isMin: boolean): string {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue: number = value / 1000;
    return isMin ? `₹${kValue}k+` : `<₹${kValue}k`;
  }
  return isMin ? `₹${value}+` : `<₹${value}`;
}

export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v: any) => v !== null) : value !== null)
    )
  );
}

interface MutationMessages {
  success?: string;
  error: string;
}

export const withToast = async <T>(
  mutationFn: Promise<T>,
  messages: Partial<MutationMessages>
): Promise<T> => {
  const { success, error } = messages;

  try {
    const result: T = await mutationFn;
    if (success) toast.success(success);
    return result;
  } catch (err) {
    if (error) toast.error(error);
    throw err;
  }
};

export const createNewUserInDatabase = async (
  user: AuthUser,
  userRole: string,
  fetchWithBQ: any,
  idToken: any
): Promise<any> => {
  const createEndpoint: string =
    userRole?.toLowerCase() === "manager" ? "/managers" : "/tenants";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || "",
      phoneNumber: "",
    },
  });

  if (createUserResponse.error) {
    throw new Error("Failed to create user record");
  }

  return createUserResponse;
};
