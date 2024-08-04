import getDistance from "@turf/distance";
import { point } from "@turf/helpers";
import * as Location from "expo-location";
import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import { getDirections } from "@/services/directions";

type Hospital = {
  id: string;
  long: number;
  lat: number;
};

type Direction = {
  routes: {
    geometry: {
      coordinates: [number, number][];
    };
    duration: number;
    distance: number;
  }[];
} | null;

type HospitalContextType = {
  selectedHospital: Hospital | undefined;
  setSelectedHospital: (hospital: Hospital | undefined) => void;
  direction: Direction;
  directionCoordinates: [number, number][] | undefined;
  duration: number | undefined;
  distance: number | undefined;
  isNearby: boolean;
};

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
  const [direction, setDirection] = useState<Direction>(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        (newLocation) => {
          if (!selectedHospital) return;
          const from = point([newLocation.coords.longitude, newLocation.coords.latitude]);
          const to = point([selectedHospital.long, selectedHospital.lat]);
          const distance = getDistance(from, to, { units: "meters" });
          setIsNearby(distance < 100);
        }
      );
    };

    if (selectedHospital) {
      watchLocation();
    }

    return () => {
      subscription?.remove();
    };
  }, [selectedHospital]);

  useEffect(() => {
    const fetchDirections = async () => {
      if (!selectedHospital) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const myLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedHospital.long, selectedHospital.lat]
      );
      setDirection(newDirection);
    };

    if (selectedHospital) {
      fetchDirections();
      setIsNearby(false);
    }
  }, [selectedHospital]);

  return (
    <HospitalContext.Provider
      value={{
        selectedHospital,
        setSelectedHospital,
        direction,
        directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
        duration: direction?.routes?.[0]?.duration,
        distance: direction?.routes?.[0]?.distance,
        isNearby,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
};
