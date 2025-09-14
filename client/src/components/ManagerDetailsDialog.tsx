"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Manager } from "@/types/prismaTypes";
import { Mail, Phone, User } from "lucide-react";
import React from "react";

interface ManagerDetailsDialogProps {
  manager: Manager;
  children: React.ReactNode;
}

const ManagerDetailsDialog: React.FC<ManagerDetailsDialogProps> = ({
  manager,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Property Manager Details</DialogTitle>
          <DialogDescription>
            Contact information for your property manager.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Name:</span>
            </div>
            <span className="col-span-2 text-sm text-gray-600">
              {manager.name}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Email:</span>
            </div>
            <span className="col-span-2 text-sm text-gray-600">
              <a
                href={`mailto:${manager.email}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {manager.email}
              </a>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Phone:</span>
            </div>
            <span className="col-span-2 text-sm text-gray-600">
              <a
                href={`tel:${manager.phoneNumber}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {manager.phoneNumber}
              </a>
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <a
            href={`mailto:${manager.email}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </a>
          <a
            href={`tel:${manager.phoneNumber}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManagerDetailsDialog;
