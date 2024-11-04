import React, { useEffect, useRef, useState } from "react";
// import Mapbox, {
//   Camera,
//   LocationPuck,
//   MapView,
//   MarkerView,
// } from "@rnmapbox/maps";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import HospitalMarkers from "@/components/HospitalMarkers";
import LineRoute from "@/components/LineRoute";
import { useHospital } from "@/providers/HospitalProvider";
import SelectedScooterSheet from "@/components/SelectedHospitalSheet";
// import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

// Mapbox.setAccessToken(
//   "pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA"
// );

// 24.817763, 67.066957

const INITIAL_REGION = {
  latitude: 24.8607343,
  longitude: 67.0011364,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const Emergency = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { directionCoordinates } = useHospital();
  const { top, bottom, left, right } = useSafeAreaInsets();

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

  // console.log(directionCoordinates);
  const mapRef = useRef<any>(null);
  const navigation = useNavigation();

  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev: any) => {
    console.log(ev);
  };

  const onRegionChange = (region: Region) => {
    console.log(region);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <MapView
        mapType="terrain"
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        // showsUserLocation
        showsMyLocationButton
        
        // showsCompass
        showsTraffic
        showsUserLocation={true}
        // cameraZoomRange={}
        // showsScale
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        mapPadding={{ left: 10, right, top: top * 2.5, bottom: 20 }}
        followsUserLocation
      >
        
      </MapView>
    </SafeAreaView>
  );
};

export default Emergency;
