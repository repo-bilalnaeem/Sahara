import React, { useEffect, useRef, useState } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "@/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
const Emergency = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const { top, right } = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const lastFetchLocation = useRef<{ lat: number; lng: number } | null>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (currentLocation) {
        fetchNearbyPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        lastFetchLocation.current = {
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        };
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 50,
        },
        (loc) => {
          setLocation(loc);

          mapRef.current?.animateCamera({
            center: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            },
            pitch: 0,
            heading: 0,
            zoom: 15,
          });

          if (
            hasMovedSignificantly(loc.coords.latitude, loc.coords.longitude)
          ) {
            fetchNearbyPlaces(loc.coords.latitude, loc.coords.longitude);
            lastFetchLocation.current = {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
            };
          }
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  const hasMovedSignificantly = (lat: number, lng: number): boolean => {
    if (!lastFetchLocation.current) return true;

    const distance = getDistanceFromLatLonInMeters(
      lat,
      lng,
      lastFetchLocation.current.lat,
      lastFetchLocation.current.lng
    );

    return distance > 200;
  };

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const types = ["hospital", "clinic", "pharmacy"];
      let allResults: any[] = [];

      for (const type of types) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY`
        );
        const data = await response.json();
        allResults = allResults.concat(data.results);
      }

      const limitedResults = allResults.slice(0, 10);
      setPlaces(limitedResults);
    } catch (error) {
      console.error("Failed to fetch nearby places:", error);
    }
  };

  const onRegionChange = (region: Region) => {
    // Optional: Add dynamic place updates here
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          mapType="standard"
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: location ? location.coords.latitude : 24.8607,
            longitude: location ? location.coords.longitude : 67.0011,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsMyLocationButton
          showsCompass={false}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          onRegionChangeComplete={onRegionChange}
          mapPadding={{ left: 10, right, top: top * 4, bottom: 20 }}
          followsUserLocation
          rotateEnabled={false}
        >
          {places.map((place, index) => {
            const lat = place?.geometry?.location?.lat;
            const lng = place?.geometry?.location?.lng;
            const name = place?.name || "Unknown Place";
            const vicinity = place?.vicinity || "No address provided";

            if (!lat || !lng) return null;

            return (
              <Marker
                key={index}
                coordinate={{ latitude: lat, longitude: lng }}
                pinColor={getPinColor(place.types)}
              >
                <Callout
                  onPress={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                    Linking.openURL(url);
                  }}
                >
                  <View style={{ width: 200 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      {name}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#555" }}>
                      {vicinity}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "#007aff", marginTop: 5 }}
                    >
                      Tap to open directions
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}

          {origin && destination && (
            <MapViewDirections
              origin={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              destination={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              apikey="AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY"
              strokeWidth={3}
              strokeColor="#000"
            />
          )}
        </MapView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const getPinColor = (types: string[]) => {
  if (types.includes("hospital")) return "#e45d5d";
  if (types.includes("clinic")) return "#3aa03a";
  if (types.includes("pharmacy")) return "#2222b1";
  return "gray";
};

function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default Emergency;
