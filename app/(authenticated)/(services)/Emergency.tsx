import React, { useEffect, useState } from "react";
import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import { View, Text, SafeAreaView } from "react-native";
import HospitalMarkers from "@/components/HospitalMarkers";
import LineRoute from "@/components/LineRoute";
import { useHospital } from "@/providers/HospitalProvider";
import SelectedScooterSheet from "@/components/SelectedHospitalSheet";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import GoBack from "@/components/GoBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA"
);

// 24.817763, 67.066957

const Emergency = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { directionCoordinates } = useHospital();
  const { top } = useSafeAreaInsets();
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
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
          }}
        >
          <GoBack title={undefined} />
        </View>
        <MapView
          style={{ flex: 1 }}
          styleURL="mapbox://styles/mapbox/dark-v11"
          // scaleBarEnabled={false}
          scaleBarPosition={{ left: 8, bottom: top }}
          compassEnabled={true}
          compassFadeWhenNorth
          
          // compassViewMargins={{ x: 0, y: 0 }}
          compassPosition={{ top: top, right: 8 }}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <StatusBar barStyle={"light-content"} />
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
