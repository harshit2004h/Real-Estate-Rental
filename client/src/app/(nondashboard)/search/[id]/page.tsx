"use client";
import Loading from "@/components/Loading";
import ApplicationModal from "@/components/searchId/ApplicationModal";
import ContactWidget from "@/components/searchId/ContactWidget";
import ImagePreviews from "@/components/searchId/ImagePreviews";
import PropertyDetails from "@/components/searchId/PropertyDetails";
import PropertyLocation from "@/components/searchId/PropertyLocation";
import PropertyOverview from "@/components/searchId/PropertyOverview";
import { useGetAuthUserQuery, useGetPropertyQuery } from "@/state/api";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const SingleListing = () => {
  const { id } = useParams();
  const properyId = Number(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: authUser } = useGetAuthUserQuery();

  const {
    data: property,
    isLoading,
    isError,
  } = useGetPropertyQuery(Number(id));
  if (isLoading) return <Loading />;
  if (isError || !property) {
    return <div className="text-center text-red-500">Property not found</div>;
  }

  const imageurls = property.photoUrls || [
    "/singlelisting-2.jpg",
    "/singlelisting-3.jpg",
  ];
  return (
    <div>
      <ImagePreviews images={imageurls} />

      <div>
        <div className="flex flex-col md:flex-row justify-center gap-0 mx-10 md:w-9/12 md:mx-auto mt-16 mb-8">
          <div className="order-2 md:order-1 md:pr-6 md:mr-2">
            <PropertyOverview propertyId={properyId} />
            <PropertyDetails propertyId={properyId} />
          </div>

          <div className="order-1 md:order-2">
            <ContactWidget onOpenModal={() => setIsModalOpen(true)} />
          </div>
        </div>{" "}
        <PropertyLocation propertyId={properyId} />
      </div>

      {authUser && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyId={properyId}
        />
      )}
    </div>
  );
};

export default SingleListing;
