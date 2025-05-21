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
import Overlay from "ol/Overlay";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";
import { MapPin } from "lucide-react";
import ReactDOMServer from "react-dom/server";
// Import required modules for MapTiler integration
import olms from "ol-mapbox-style";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<OLMap | null>(null);
  const filters = useAppSelector((state) => state.global.filters);
  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);

  useEffect(() => {
    if (isLoading || isError || !properties) return;

    const mapCenter = filters.coordinates || [-74.5, 40];
    const view = new View({
      center: fromLonLat(mapCenter),
      zoom: 9,
    });

    // Create an empty map with just the view
    const map = new OLMap({
      target: mapRef.current!,
      view: view,
    });

    mapObjRef.current = map;

    // Apply the MapTiler style using olms
    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    const mapTilerStyleUrl = `https://api.maptiler.com/maps/0196f230-0caf-7409-a63a-ac4220693e60/style.json?key=${apiKey}`;

    // Apply the style to the map
    olms(map, mapTilerStyleUrl).then(() => {
      // Create vector layer for markers after the base map is loaded
      addMarkersToMap(map, properties);
    });

    const overlay = new Overlay({
      element: popupRef.current!,
      positioning: "bottom-center",
      stopEvent: true,
      offset: [0, -20],
    });
    map.addOverlay(overlay);

    // Single click handler with improved popup closing functionality
    map.on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);

      // Always hide the popup first
      overlay.setPosition(undefined);

      // If a feature was clicked, show the popup for that feature
      if (feature) {
        const prop: Property = feature.get("property");
        const geometry = feature.getGeometry();

        // Make sure geometry exists and is a Point
        if (geometry && geometry instanceof Point) {
          const coord = geometry.getCoordinates();
          if (popupRef.current) {
            popupRef.current.innerHTML = `
              <div class="marker-popup">
                <div class="marker-popup-image"></div>
                <div>
                  <a href="/search/${prop.id}" target="_blank" class="marker-popup-title">${prop.name}</a>
                  <p class="marker-popup-price">
                    $${prop.pricePerMonth}
                    <span class="marker-popup-price-unit"> / month</span>
                  </p>
                </div>
              </div>
            `;
            // Set position after content is updated
            overlay.setPosition(coord);
          }
        }
      }
    });

    // Add a pointer move event to show cursor when hovering over markers
    map.on("pointermove", function (e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    const resizeMap = () => {
      if (map) setTimeout(() => map.updateSize(), 700);
    };
    resizeMap();

    return () => {
      map.setTarget(undefined);
    };
  }, [isLoading, isError, properties, filters.coordinates]);

  // Function to add markers to the map
  const addMarkersToMap = (map: any, properties: Property[]) => {
    const markerSVG = ReactDOMServer.renderToStaticMarkup(
      <MapPin
        color="#000000"
        size={32}
        strokeWidth={2.5}
        className="cursor-pointer"
      />
    );
    const markerBase64 = `data:image/svg+xml;base64,${btoa(markerSVG)}`;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: markerBase64,
          scale: 1,
          anchor: [0.5, 1],
        }),
      }),
    });

    map.addLayer(vectorLayer);

    properties.forEach((property: Property) => {
      const coord = fromLonLat([
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ]);
      const feature = new Feature({
        geometry: new Point(coord),
        property,
      });
      vectorSource.addFeature(feature);
    });
  };

  if (isLoading) return <>Loading...</>;
  if (isError || !properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        ref={mapRef}
        className="rounded-xl"
        style={{ height: "100%", width: "100%" }}
      />
      <div
        ref={popupRef}
        style={{
          background: "#fff",
          padding: "8px",
          borderRadius: "6px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          position: "absolute",
          bottom: "12px",
          left: "-50%",
          minWidth: "200px",
          zIndex: 1000,
        }}
      ></div>
    </div>
  );
};

export default Map;
