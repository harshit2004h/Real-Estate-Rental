/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map as OLMap, View } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { useGetPropertyQuery } from "@/state/api";
import { Compass, MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";
// Import required modules for MapTiler integration
import olms from "ol-mapbox-style";
import Loading from "../Loading";

const PropertyLocation = ({ propertyId }: PropertyLocationProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<OLMap | null>(null);

  useEffect(() => {
    if (isLoading || isError || !property) return;

    const view = new View({
      center: fromLonLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ]),
      zoom: 14,
    });

    // Create an empty map with just the view
    const map = new OLMap({
      target: mapContainerRef.current!,
      view: view,
    });

    mapObjRef.current = map;

    // Apply the MapTiler style using olms
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    const mapTilerStyleUrl = `https://api.maptiler.com/maps/0196f230-0caf-7409-a63a-ac4220693e60/style.json?key=${apiKey}`;

    // Apply the style to the map
    olms(map, mapTilerStyleUrl).then(() => {
      // Create vector layer for marker after the base map is loaded
      addMarkerToMap(map, property);
    });

    // Add cursor pointer and dragging behavior
    if (mapContainerRef.current) {
      // Set default cursor to grab (indicating it can be dragged)
      mapContainerRef.current.style.cursor = "grab";

      // Add event listeners directly to the container element
      const container = mapContainerRef.current;

      const handleMouseDown = () => {
        if (container) container.style.cursor = "grabbing";
      };

      const handleMouseUp = () => {
        if (container) container.style.cursor = "grab";
      };

      // Use DOM events instead of map events
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseup", handleMouseUp);
      // Also handle case when mouse leaves the map during drag
      container.addEventListener("mouseleave", handleMouseUp);

      // For OpenLayers we can use the supported 'pointermove' event
      map.on("pointermove", () => {
        // Only change cursor on move if not currently grabbing
        if (container && container.style.cursor !== "grabbing") {
          container.style.cursor = "grab";
        }
      });

      // Clean up function to remove event listeners
      return () => {
        map.setTarget(undefined);
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
      };
    }

    const resizeMap = () => {
      if (map) setTimeout(() => map.updateSize(), 100);
    };
    resizeMap();

    return () => {
      map.setTarget(undefined);
    };
  }, [property, isError, isLoading, propertyId]);

  // Function to add marker to the map
  const addMarkerToMap = (map: any, property: any) => {
    // Create black MapPin SVG marker
    const markerSVG = ReactDOMServer.renderToStaticMarkup(
      <MapPin color="#000000" size={32} strokeWidth={2.5} />
    );
    const markerBase64 = `data:image/svg+xml;base64,${btoa(markerSVG)}`;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: markerBase64,
          scale: 1,
          anchor: [0.5, 1], // Anchor at bottom center like Mapbox marker
        }),
      }),
    });

    map.addLayer(vectorLayer);

    // Add the property marker
    const coord = fromLonLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ]);
    const feature = new Feature({
      geometry: new Point(coord),
      property,
    });
    vectorSource.addFeature(feature);
  };

  if (isLoading) return <Loading/>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div className="py-16 w-9/12 mx-auto">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        Map and Location
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-700" />
          Property Address:
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || "Address not available"}
          </span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            property.location?.address || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <Compass className="w-5 h-5" />
          Get Directions
        </a>
      </div>
      <div
        className="relative mt-4 h-[300px] rounded-lg overflow-hidden"
        ref={mapContainerRef}
      />
    </div>
  );
};

export default PropertyLocation;
