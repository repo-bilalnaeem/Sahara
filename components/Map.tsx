import { View, Text } from "react-native";

import React, { useEffect, useState } from "react";
import Mapbox, { Camera, MapView, MarkerView } from "@rnmapbox/maps";
import * as Location from "expo-location";
import HospitalMarkers from "@/components/HospitalMarkers";
import LineRoute from "@/components/LineRoute";
import { useHospital } from "@/providers/HospitalProvider";
import SelectedScooterSheet from "@/components/SelectedHospitalSheet";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA"
);

const Map = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { directionCoordinates } = useHospital();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
        {location && (
          <>
            <Camera
              followZoomLevel={14}
              followUserLocation
              centerCoordinate={[
                location.coords.longitude,
                location.coords.latitude,
              ]}
            />
            <MarkerView
              id="currentLocationMarker"
              coordinate={[location.coords.longitude, location.coords.latitude]}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "#0957DE",
                  borderRadius: 10,
                  borderColor: "white",
                  borderWidth: 3,
                }}
              />
            </MarkerView>
          </>
        )}
        <HospitalMarkers
          longitude={location?.coords.longitude}
          latitude={location?.coords.latitude}
        />
        {directionCoordinates && (
          <LineRoute coordinates={directionCoordinates} />
        )}
      </MapView>
      <SelectedScooterSheet />
    </View>
  );
};

export default Map;
