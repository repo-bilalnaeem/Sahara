import React, { useEffect, useRef, useState } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { selectOrigin, selectDestination, setOrigin, setDestination } from "@/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Emergency = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const { top, right } = useSafeAreaInsets();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Reverse geocode to get address details
      if (currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("My location address: ", data.results[0].formatted_address); // Log the entire response for debugging

            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              // dispatch(
              //   setOrigin({
              //     location: details?.geometry.location,
              //     description: data.description,
              //   })
              // );
              dispatch(
                setOrigin({
                  location: {
                    lat: latitude,
                    lng: longitude,
                  },
                  description: address,
                })
              );
            } else {
              console.log("No address found for the current location.");
            }
          })
          .catch((error) => console.error("Geocoding API Error:", error));
      }
    })();
  }, []);

  const mapRef = useRef<any>(null);


  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  console.log("Origin:", origin)
  console.log("Destination", destination)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <MapView
        mapType="standard"
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location ? location.coords.latitude : 24.8607,
          longitude: location ? location.coords.longitude : 67.0011,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        // cacheEnabled
        
        showsMyLocationButton
        showsCompass={false}
        showsTraffic
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        mapPadding={{ left: 10, right, top: top * 4, bottom: 20 }}
        followsUserLocation
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey="AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY"
            strokeWidth={3}
            strokeColor="#000"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default Emergency;
