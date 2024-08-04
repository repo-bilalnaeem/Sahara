// import React from "react";
// import { ShapeSource, SymbolLayer, CircleLayer, Images } from "@rnmapbox/maps";
// import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
// import { featureCollection, point } from "@turf/helpers";
// import { useHospital } from "@/providers/HospitalProvider";

// import pin from "@/assets/clinic.png";
// import hospitals from "@/assets/data/hospitals.json";

// const ScooterMarkers = () => {
//   const { setSelectedHospital } = useHospital();

//   const points = hospitals.map((hospital) =>
//     point([hospital.long, hospital.lat], { hospital })
//   );

//   const onPointPress = async (event: OnPressEvent) => {
//     if (event.features[0].properties?.hospital) {
//       setSelectedHospital(event.features[0].properties.hospital);
//     }
//   };

//   return (
//     <ShapeSource
//       id="scooters"
//       shape={featureCollection(points)}
//       cluster
//       onPress={onPointPress}
//     >
//       <SymbolLayer
//         id="clusters-count"
//         style={{
//           textField: ["get", "point_count"],
//           textSize: 18,
//           textColor: "#ffffff",
//           textPitchAlignment: "map",
//         }}
//       />
//       <CircleLayer
//         id="clusters"
//         belowLayerID="clusters-count"
//         filter={["has", "point_count"]}
//         style={{
//           circlePitchAlignment: "map",
//           circleColor: "#42E100",
//           circleRadius: 20,
//           circleOpacity: 1,
//           circleStrokeWidth: 2,
//           circleStrokeColor: "white",
//         }}
//       />

//       <SymbolLayer
//         id="scooter-icons"
//         filter={["!", ["has", "point_count"]]}
//         style={{
//           iconImage: "pin",
//           iconSize: 0.06,
//           iconAllowOverlap: true,
//           iconAnchor: "bottom",
//         }}
//       />
//       <Images images={{ pin }} />
//     </ShapeSource>
//   );
// };

// export default ScooterMarkers;
// import React, { useState, useEffect } from 'react';
// import { ShapeSource, SymbolLayer, CircleLayer, Images } from "@rnmapbox/maps";
// import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
// import { featureCollection, point } from "@turf/helpers";
// import axios from 'axios';
// import { useHospital } from "@/providers/HospitalProvider";
// import pin from "@/assets/clinic.png";

// // Replace with your Mapbox access token
// // const ACCESS_TOKEN = '';

// const HospitalMarkers = ({ longitude, latitude }) => {
//   const { setSelectedHospital } = useHospital();
//   const [hospitals, setHospitals] = useState([]);

//   // Function to fetch nearby hospitals
//   const fetchNearbyHospitals = async (longitude: any, latitude: any) => {
//     const radius = 5000; // 5 km radius
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=-122.084,37.4219983&radius=20000&access_token=pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA`;

//     try {
//       const response = await axios.get(url);
//       return response.data.features.map((feature: { geometry: { coordinates: any[]; }; text: any; }) => ({
//         long: feature.geometry.coordinates[0],
//         lat: feature.geometry.coordinates[1],
//         name: feature.text,
//       }));
//     } catch (error) {
//       console.error('Error fetching hospitals:', error);
//       return [];
//     }
//   };

//   // Fetch hospitals when component mounts or location changes
//   useEffect(() => {
//     const getHospitals = async () => {
//       const data = await fetchNearbyHospitals(longitude, latitude);
//       setHospitals(data);
//     };

//     getHospitals();
//   }, [longitude, latitude]);

//   // Create point features for Mapbox
//   const points = hospitals.map((hospital) =>
//     point([hospital.long, hospital.lat], { hospital })
//   );

//   // Handle point press events
//   const onPointPress = async (event: OnPressEvent) => {
//     if (event.features[0].properties?.hospital) {
//       setSelectedHospital(event.features[0].properties.hospital);
//     }
//   };

//   return (
//     <ShapeSource
//       id="hospitals"
//       shape={featureCollection(points)}
//       cluster
//       onPress={onPointPress}
//     >
//       <SymbolLayer
//         id="clusters-count"
//         style={{
//           textField: ["get", "point_count"],
//           textSize: 18,
//           textColor: "#ffffff",
//           textPitchAlignment: "map",
//         }}
//       />
//       <CircleLayer
//         id="clusters"
//         belowLayerID="clusters-count"
//         filter={["has", "point_count"]}
//         style={{
//           circlePitchAlignment: "map",
//           circleColor: "#42E100",
//           circleRadius: 20,
//           circleOpacity: 1,
//           circleStrokeWidth: 2,
//           circleStrokeColor: "white",
//         }}
//       />
//       <SymbolLayer
//         id="hospital-icons"
//         filter={["!", ["has", "point_count"]]}
//         style={{
//           iconImage: "pin",
//           iconSize: 0.06,
//           iconAllowOverlap: true,
//           iconAnchor: "bottom",
//         }}
//       />
//       <Images images={{ pin }} />
//     </ShapeSource>
//   );
// };

// export default HospitalMarkers;

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
    const radius = 5000; // 5 km radius
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&radius=${radius}&access_token=${ACCESS_TOKEN}`;
    try {
      const response = await axios.get(url);
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
    const getHospitals = async () => {
      const data = await fetchNearbyHospitals(longitude, latitude);
      // console.log(data)
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
