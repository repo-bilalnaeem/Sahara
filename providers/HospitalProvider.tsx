// // import * as Location from "expo-location";
// // import * as Speech from "expo-speech";
// // import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
// // import { getDirections } from "@/services/directions";

// // type Hospital = {
// //   id: string;
// //   long: number;
// //   lat: number;
// // };

// // type Direction = {
// //   routes: {
// //     geometry: {
// //       coordinates: [number, number][];
// //     };
// //     legs: {
// //       steps: {
// //         maneuver: {
// //           instruction: string;
// //           location: [number, number];
// //         };
// //       }[];
// //     }[];
// //   }[];
// // } | null;

// // type HospitalContextType = {
// //   selectedHospital: Hospital | undefined;
// //   setSelectedHospital: (hospital: Hospital | undefined) => void;
// //   direction: Direction;
// //   directionCoordinates: [number, number][] | undefined;
// //   journeyStarted: boolean;
// //   startJourney: () => void;
// // };

// // const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

// // export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
// //   const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
// //   const [direction, setDirection] = useState<Direction>(null);
// //   const [journeyStarted, setJourneyStarted] = useState(false);

// //   useEffect(() => {
// //     let locationSubscription: Location.LocationSubscription | undefined;

// //     const watchLocation = async () => {
// //       const { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') return;

// //       locationSubscription = await Location.watchPositionAsync(
// //         { accuracy: Location.Accuracy.High, distanceInterval: 5 },
// //         async (location) => {
// //           if (selectedHospital) {
// //             const newDirection = await getDirections([location.coords.longitude, location.coords.latitude], [selectedHospital.long, selectedHospital.lat]);
// //             setDirection(newDirection);
// //           }
// //         }
// //       );
// //     };

// //     if (journeyStarted && selectedHospital) {
// //       watchLocation();
// //     }

// //     return () => {
// //       locationSubscription?.remove();
// //     };
// //   }, [journeyStarted, selectedHospital]);

// //   const startJourney = () => {
// //     setJourneyStarted(true);
// //   };

// //   return (
// //     <HospitalContext.Provider
// //       value={{
// //         selectedHospital,
// //         setSelectedHospital,
// //         direction,
// //         directionCoordinates: direction?.routes[0].geometry.coordinates,
// //         journeyStarted,
// //         startJourney,
// //       }}
// //     >
// //       {children}
// //     </HospitalContext.Provider>
// //   );
// // }

// // export const useHospital = () => {
// //   const context = useContext(HospitalContext);
// //   if (!context) {
// //     throw new Error("useHospital must be used within a HospitalProvider");
// //   }
// //   return context;
// // };import * as Location from "expo-location";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   PropsWithChildren,
// } from "react";
// import { getDirections, DirectionResult } from "@/services/directions";
// import * as Location from "expo-location";

// type Hospital = {
//   id: string;
//   long: number;
//   lat: number;
// };

// type HospitalContextType = {
//   selectedHospital: Hospital | undefined;
//   setSelectedHospital: (hospital: Hospital | undefined) => void;
//   direction: DirectionResult | null;
//   directionCoordinates: [number, number][] | undefined;
//   journeyStarted: boolean;
//   startJourney: () => void;
// };

// const HospitalContext = createContext<HospitalContextType | undefined>(
//   undefined
// );

// export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
//   const [selectedHospital, setSelectedHospital] = useState<
//     Hospital | undefined
//   >(undefined);
//   const [direction, setDirection] = useState<DirectionResult | null>(null);
//   const [journeyStarted, setJourneyStarted] = useState(false);

//   useEffect(() => {
//     let locationSubscription: Location.LocationSubscription | undefined;

//     const watchLocation = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") return;

//       locationSubscription = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, distanceInterval: 5 },
//         async (location) => {
//           if (selectedHospital) {
//             const newDirection = await getDirections(
//               [location.coords.longitude, location.coords.latitude],
//               [selectedHospital.long, selectedHospital.lat]
//             );
//             setDirection(newDirection);
//           }
//         }
//       );
//     };

//     if (journeyStarted && selectedHospital) {
//       watchLocation();
//     }

//     return () => {
//       locationSubscription?.remove();
//     };
//   }, [journeyStarted, selectedHospital]);

//   const startJourney = () => {
//     setJourneyStarted(true);
//   };

//   return (
//     <HospitalContext.Provider
//       value={{
//         selectedHospital,
//         setSelectedHospital,
//         direction,
//         directionCoordinates: direction?.route.geometry.coordinates,
//         journeyStarted,
//         startJourney,
//       }}
//     >
//       {children}
//     </HospitalContext.Provider>
//   );
// }

// export const useHospital = () => {
//   const context = useContext(HospitalContext);
//   if (!context) {
//     throw new Error("useHospital must be used within a HospitalProvider");
//   }
//   return context;
// };
import * as Location from "expo-location";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { getDirections, DirectionsApiResponse } from "@/services/directions";

type Hospital = {
  id: string;
  long: number;
  lat: number;
};

type HospitalContextType = {
  selectedHospital: Hospital | undefined;
  setSelectedHospital: (hospital: Hospital | undefined) => void;
  direction: DirectionsApiResponse | null;
  directionCoordinates: [number, number][] | undefined;
  journeyStarted: boolean;
  startJourney: () => void;
  duration: number | undefined; // Added
  distance: number | undefined; // Added
};

const HospitalContext = createContext<HospitalContextType | undefined>(
  undefined
);

export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
  const [selectedHospital, setSelectedHospital] = useState<
    Hospital | undefined
  >(undefined);
  const [direction, setDirection] = useState<DirectionsApiResponse | null>(
    null
  );
  const [journeyStarted, setJourneyStarted] = useState(false);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | undefined;

    const watchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        async (location) => {
          if (selectedHospital) {
            const newDirection = await getDirections(
              [location.coords.longitude, location.coords.latitude],
              [selectedHospital.long, selectedHospital.lat]
            );
            setDirection(newDirection);
          }
        }
      );
    };

    if (journeyStarted && selectedHospital) {
      watchLocation();
    }

    return () => {
      locationSubscription?.remove();
    };
  }, [journeyStarted, selectedHospital]);

  const startJourney = () => {
    setJourneyStarted(true);
  };

  // Extract duration and distance
  const duration = direction?.routes[0]?.duration;
  const distance = direction?.routes[0]?.distance;

  // console.log(direction);

  return (
    <HospitalContext.Provider
      value={{
        selectedHospital,
        setSelectedHospital,
        direction,
        directionCoordinates: direction?.routes[0].geometry.coordinates,
        journeyStarted,
        startJourney,
        distance,
        duration,
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
