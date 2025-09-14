import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ApplicationCard = ({
  application,
  userType,
  children,
}: ApplicationCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    application.property.photoUrls?.[0] || "/placeholder.jpg"
  );

  const statusColor =
    application.status === "Approved"
      ? "bg-green-500"
      : application.status === "Denied"
      ? "bg-red-500"
      : "bg-yellow-500";

  const contactPerson =
    userType === "manager" ? application.tenant : application.manager;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white mb-4 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Property Info Section */}
          <div className="flex flex-col sm:flex-row gap-4 lg:flex-1 lg:max-w-[60%]">
            <div className="flex-shrink-0">
              <Image
                src={imgSrc}
                alt={application.property.name}
                width={160}
                height={120}
                className="rounded-lg object-cover w-full sm:w-[160px] h-[120px]"
                sizes="(max-width: 800px) 100vw, 160px"
                onError={() => setImgSrc("/placeholder.jpg")}
              />
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <h2 className="text-xl font-bold mb-2 line-clamp-1">
                  {application.property.name}
                </h2>
                <div className="flex items-center mb-2 text-gray-600">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">{`${application.property.location.city}, ${application.property.location.country}`}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <span>{application.property.beds} Beds</span>
                  <span>•</span>
                  <span>{application.property.baths} Baths</span>
                  <span>•</span>
                  <span>{application.property.squareFeet} sq ft</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold text-green-600">
                  ${application.property.pricePerMonth}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Security Deposit:{" "}
                  <span className="font-medium">
                    ${application.property.securityDeposit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-24 bg-gray-200"></div>

          {/* Status and Date Section */}
          <div className="lg:w-48">
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-2">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Status
                </span>
                <span
                  className={`px-3 py-1 ${statusColor} text-white rounded-full text-sm font-medium w-fit`}
                >
                  {application.status}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                  Applied
                </span>
                <span className="text-sm font-medium">
                  {new Date(application.applicationDate).toLocaleDateString(
                    "en-GB"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-24 bg-gray-200"></div>

          {/* Contact Person Section */}
          <div className="lg:w-64">
            <div className="text-sm uppercase tracking-wide text-gray-500 mb-3">
              {userType === "manager" ? "Tenant" : "Manager"}
            </div>
            <div className="flex items-start gap-3">
              <Image
                src="/landing-i1.png"
                alt={contactPerson.name}
                width={44}
                height={44}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="font-medium text-base truncate">
                  {contactPerson.name}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <PhoneCall className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{contactPerson.phoneNumber}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{contactPerson.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {children && (
        <>
          <hr className="border-gray-200" />
          <div className="p-4">{children}</div>
        </>
      )}
    </div>
  );
};

export default ApplicationCard;
