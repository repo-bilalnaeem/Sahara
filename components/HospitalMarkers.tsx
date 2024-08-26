import React, { useState, useEffect } from "react";
import { ShapeSource, SymbolLayer, CircleLayer, Images } from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection, point } from "@turf/helpers";
import axios from "axios";
import { useHospital } from "@/providers/HospitalProvider";
import pin from "@/assets/clinic.png";

// Replace with your Mapbox access token
const ACCESS_TOKEN =
  "pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA";

// Define TypeScript interfaces for props and hospital data
interface Hospital {
  long: number;
  lat: number;
  name: string;
}

interface HospitalMarkersProps {
  longitude: number | undefined;
  latitude: number | undefined;
}

const HospitalMarkers = ({ longitude, latitude }: HospitalMarkersProps) => {
  const { setSelectedHospital } = useHospital();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // Function to fetch nearby hospitals
  const fetchNearbyHospitals = async (
    longitude: number | undefined,
    latitude: number | undefined
  ): Promise<Hospital[]> => {
    if (longitude === undefined || latitude === undefined) {
      // console.error("Longitude or latitude is undefined");
      return [];
    }
    
    const radius = 7500; // 7.5 km radius
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&access_token=${ACCESS_TOKEN}`;
    try {
      const response = await axios.get(url);
      // console.log(response);
      const features = response.data.features;
      return features.map(
        (feature: { geometry: { coordinates: number[] }; text: string }) => ({
          long: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
          name: feature.text,
        })
      );
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  };
  
  // Fetch hospitals when component mounts or location changes
  useEffect(() => {
    // console.log("Longitude:", longitude, "Latitude:", latitude);
    const getHospitals = async () => {
      const data = await fetchNearbyHospitals(longitude, latitude);
      setHospitals(data);
    };
  
    getHospitals();
  }, [longitude, latitude]);

  // Create point features for Mapbox
  const points = hospitals.map((hospital) =>
    point([hospital.long, hospital.lat], { hospital })
  );

  // Handle point press events
  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0]?.properties?.hospital) {
      setSelectedHospital(event.features[0].properties.hospital);
    }
  };

  return (
    <ShapeSource
      id="hospitals"
      shape={featureCollection(points)}
      cluster
      onPress={onPointPress}
    >
      <SymbolLayer
        id="clusters-count"
        style={{
          textField: ["get", "point_count"],
          textSize: 18,
          textColor: "#ffffff",
          textPitchAlignment: "map",
        }}
      />
      <CircleLayer
        id="clusters"
        belowLayerID="clusters-count"
        filter={["has", "point_count"]}
        style={{
          circlePitchAlignment: "map",
          circleColor: "#42E100",
          circleRadius: 20,
          circleOpacity: 1,
          circleStrokeWidth: 2,
          circleStrokeColor: "white",
        }}
      />
      <SymbolLayer
        id="hospital-icons"
        filter={["!", ["has", "point_count"]]}
        style={{
          iconImage: "pin",
          iconSize: 0.06,
          iconAllowOverlap: true,
          iconAnchor: "bottom",
        }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
};

export default HospitalMarkers;
