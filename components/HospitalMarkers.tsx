import React from "react";
import { ShapeSource, SymbolLayer, CircleLayer, Images } from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection, point } from "@turf/helpers";
import { useHospital } from "@/providers/HospitalProvider";

import pin from "@/assets/clinic.png";
import hospitals from "@/assets/data/hospitals.json";

const ScooterMarkers = () => {
  const { setSelectedHospital } = useHospital();

  const points = hospitals.map((hospital) =>
    point([hospital.long, hospital.lat], { hospital })
  );

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.hospital) {
      setSelectedHospital(event.features[0].properties.hospital);
    }
  };

  return (
    <ShapeSource
      id="scooters"
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
        id="scooter-icons"
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

export default ScooterMarkers;
