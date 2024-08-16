import React, { useEffect, useState } from "react";
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import { View, Text } from "react-native";
import HospitalMarkers from "@/components/HospitalMarkers";
import LineRoute from "@/components/LineRoute";
import { useHospital } from "@/providers/HospitalProvider";
import SelectedScooterSheet from "@/components/SelectedHospitalSheet";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA"
);

// 24.817763, 67.066957

const Emergency = () => {
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
      // console.log(location);
    })();
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
          <Camera followZoomLevel={14} followUserLocation />
          {location && (
            <>
              <Camera
                zoomLevel={18}
                centerCoordinate={[67.066957, 24.817763]}
              />
              <MarkerView
                id="currentLocationMarker"
                coordinate={[67.066957, 24.817763]}
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
          {/* <LocationPuck
            visible={true}
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{ isEnabled: true }}
          /> */}
          <HospitalMarkers
            longitude={
              67.066957
              // ||location?.coords.longitude
            }
            latitude={
              24.817763
              // location?.coords.latitude
            }
          />

          {directionCoordinates && (
            <LineRoute coordinates={directionCoordinates} />
          )}
        </MapView>
      </View>
      <SelectedScooterSheet></SelectedScooterSheet>
    </>
  );
};

export default Emergency;
