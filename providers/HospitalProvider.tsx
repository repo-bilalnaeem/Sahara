// // import getDistance from "@turf/distance";
// // import { point } from "@turf/helpers";
// // import * as Location from "expo-location";
// // import * as Speech from "expo-speech";
// // import React, {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// //   PropsWithChildren,
// // } from "react";
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
// //     duration: number;
// //     distance: number;
// //   }[];
// // } | null;

// // type HospitalContextType = {
// //   selectedHospital: Hospital | undefined;
// //   setSelectedHospital: (hospital: Hospital | undefined) => void;
// //   direction: Direction;
// //   directionCoordinates: [number, number][] | undefined;
// //   duration: number | undefined;
// //   distance: number | undefined;
// //   isNearby: boolean;
// //   journeyStarted: boolean;
// //   startJourney: () => void;
// // };

// // const HospitalContext = createContext<HospitalContextType | undefined>(
// //   undefined
// // );

// // export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
// //   const [selectedHospital, setSelectedHospital] = useState<
// //     Hospital | undefined
// //   >(undefined);
// //   const [direction, setDirection] = useState<Direction>(null);
// //   const [isNearby, setIsNearby] = useState(false);
// //   const [journeyStarted, setJourneyStarted] = useState(false);
// //   const [lastSpokenIndex, setLastSpokenIndex] = useState(0);

// //   useEffect(() => {
// //     let subscription: Location.LocationSubscription | undefined;

// //     const speakDirection = (instruction: string) => {
// //       Speech.speak(instruction);
// //     };

// //     const watchLocation = async () => {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== "granted") {
// //         console.log("Permission to access location was denied");
// //         return;
// //       }

// //       subscription = await Location.watchPositionAsync(
// //         { distanceInterval: 10 },
// //         async (newLocation) => {
// //           if (!selectedHospital || !direction || !journeyStarted) return;

// //           const from = point([
// //             newLocation.coords.longitude,
// //             newLocation.coords.latitude,
// //           ]);
// //           const to = point([selectedHospital.long, selectedHospital.lat]);
// //           const distanceToHospital = getDistance(from, to, { units: "meters" });
// //           setIsNearby(distanceToHospital < 100);

// //           // Get the current coordinates
// //           const currentCoordinates = [
// //             newLocation.coords.longitude,
// //             newLocation.coords.latitude,
// //           ] as [number, number];

// //           // Find the closest coordinate in the route
// //           const routeCoordinates =
// //             direction.routes[0]?.geometry?.coordinates || [];
// //           let closestIndex = lastSpokenIndex;
// //           for (let i = lastSpokenIndex; i < routeCoordinates.length; i++) {
// //             const routePoint = point(routeCoordinates[i]);
// //             const distanceToRoutePoint = getDistance(from, routePoint, {
// //               units: "meters",
// //             });

// //             if (distanceToRoutePoint < 20) {
// //               closestIndex = i;
// //               break;
// //             }
// //           }

// //           // Speak the next direction if the user has passed a route point
// //           if (closestIndex > lastSpokenIndex) {
// //             setLastSpokenIndex(closestIndex);
// //             const nextRoutePoint = routeCoordinates[closestIndex + 1];
// //             if (nextRoutePoint) {
// //               const [nextLongitude, nextLatitude] = nextRoutePoint;
// //               const nextLocation = await Location.reverseGeocodeAsync({
// //                 longitude: nextLongitude,
// //                 latitude: nextLatitude,
// //               });
// //               const address = nextLocation[0]?.street || "unknown location";
// //               console.log(address);
// //               const instruction = `Proceed to ${address}.`;
// //               console.log(instruction);
// //               speakDirection(instruction);
// //             }
// //           }

// //           if (isNearby) {
// //             speakDirection("You have arrived at your destination.");
// //             subscription?.remove();
// //           }
// //         }
// //       );
// //     };

// //     if (selectedHospital && journeyStarted) {
// //       watchLocation();
// //     }

// //     return () => {
// //       subscription?.remove();
// //     };
// //   }, [selectedHospital, direction, lastSpokenIndex, journeyStarted]);

// //   useEffect(() => {
// //     const fetchDirections = async () => {
// //       if (!selectedHospital) return;

// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== "granted") {
// //         console.log("Permission to access location was denied");
// //         return;
// //       }

// //       const myLocation = await Location.getCurrentPositionAsync();
// //       const newDirection = await getDirections(
// //         [myLocation.coords.longitude, myLocation.coords.latitude],
// //         [selectedHospital.long, selectedHospital.lat]
// //       );
// //       setDirection(newDirection);
// //     };

// //     if (selectedHospital) {
// //       fetchDirections();
// //       setIsNearby(false);
// //       setJourneyStarted(false);
// //     }
// //   }, [selectedHospital]);

// //   const startJourney = () => {
// //     setJourneyStarted(true);
// //     setLastSpokenIndex(0); // Reset the last spoken index when starting a new journey
// //   };

// //   return (
// //     <HospitalContext.Provider
// //       value={{
// //         selectedHospital,
// //         setSelectedHospital,
// //         direction,
// //         directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
// //         duration: direction?.routes?.[0]?.duration,
// //         distance: direction?.routes?.[0]?.distance,
// //         isNearby,
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
// // };
// import getDistance from "@turf/distance";
// import { point } from "@turf/helpers";
// import * as Location from "expo-location";
// import * as Speech from "expo-speech";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   PropsWithChildren,
// } from "react";
// import { getDirections } from "@/services/directions";

// type Hospital = {
//   id: string;
//   long: number;
//   lat: number;
// };

// type Direction = {
//   routes: {
//     geometry: {
//       coordinates: [number, number][];
//     };
//     duration: number;
//     distance: number;
//   }[];
// } | null;

// type HospitalContextType = {
//   selectedHospital: Hospital | undefined;
//   setSelectedHospital: (hospital: Hospital | undefined) => void;
//   direction: Direction;
//   directionCoordinates: [number, number][] | undefined;
//   duration: number | undefined;
//   distance: number | undefined;
//   isNearby: boolean;
//   journeyStarted: boolean;
//   startJourney: () => void;
// };

// const HospitalContext = createContext<HospitalContextType | undefined>(
//   undefined
// );

// export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
//   const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
//   const [direction, setDirection] = useState<Direction>(null);
//   const [isNearby, setIsNearby] = useState(false);
//   const [journeyStarted, setJourneyStarted] = useState(false);
//   const [lastSpokenIndex, setLastSpokenIndex] = useState(0);

//   useEffect(() => {
//     let subscription: Location.LocationSubscription | undefined;

//     const speakDirection = (instruction: string) => {
//       Speech.speak(instruction);
//     };

//     const watchLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       subscription = await Location.watchPositionAsync(
//         { distanceInterval: 10 },
//         async (newLocation) => {
//           if (!selectedHospital || !direction || !journeyStarted) return;

//           const from = point([
//             newLocation.coords.longitude,
//             newLocation.coords.latitude,
//           ]);
//           const to = point([selectedHospital.long, selectedHospital.lat]);
//           const distanceToHospital = getDistance(from, to, { units: "meters" });
//           setIsNearby(distanceToHospital < 100);

//           const routeCoordinates =
//             direction.routes[0]?.geometry?.coordinates || [];
//           let closestIndex = lastSpokenIndex;

//           // Find the closest coordinate in the route
//           for (let i = lastSpokenIndex; i < routeCoordinates.length; i++) {
//             const routePoint = point(routeCoordinates[i]);
//             const distanceToRoutePoint = getDistance(from, routePoint, {
//               units: "meters",
//             });

//             if (distanceToRoutePoint < 20) {
//               closestIndex = i;
//               break;
//             }
//           }

//           // Speak the next direction if the user has passed a route point
//           if (closestIndex > lastSpokenIndex) {
//             setLastSpokenIndex(closestIndex);
//             const nextRoutePoint = routeCoordinates[closestIndex + 1];
//             if (nextRoutePoint) {
//               const [nextLongitude, nextLatitude] = nextRoutePoint;
//               const nextLocation = await Location.reverseGeocodeAsync({
//                 longitude: nextLongitude,
//                 latitude: nextLatitude,
//               });
//               const address = nextLocation[0]?.street || "unknown location";
//               const instruction = `Proceed to ${address}.`;
//               speakDirection(instruction);
//             }
//           }

//           if (isNearby) {
//             speakDirection("You have arrived at your destination.");
//             subscription?.remove();
//           }
//         }
//       );
//     };

//     if (selectedHospital && journeyStarted) {
//       watchLocation();
//     }

//     return () => {
//       subscription?.remove();
//     };
//   }, [selectedHospital, direction, lastSpokenIndex, journeyStarted, isNearby]);

//   useEffect(() => {
//     const fetchDirections = async () => {
//       if (!selectedHospital) return;

//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       const myLocation = await Location.getCurrentPositionAsync();
//       const newDirection = await getDirections(
//         [myLocation.coords.longitude, myLocation.coords.latitude],
//         [selectedHospital.long, selectedHospital.lat]
//       );
//       setDirection(newDirection);
//     };

//     if (selectedHospital) {
//       fetchDirections();
//       setIsNearby(false);
//       setJourneyStarted(false);
//     }
//   }, [selectedHospital]);

//   const startJourney = () => {
//     setJourneyStarted(true);
//     setLastSpokenIndex(0); // Reset the last spoken index when starting a new journey
//   };

//   return (
//     <HospitalContext.Provider
//       value={{
//         selectedHospital,
//         setSelectedHospital,
//         direction,
//         directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
//         duration: direction?.routes?.[0]?.duration,
//         distance: direction?.routes?.[0]?.distance,
//         isNearby,
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
import getDistance from "@turf/distance";
import { point } from "@turf/helpers";
import * as Location from "expo-location";
import * as Speech from "expo-speech";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { getDirections } from "@/services/directions";

type Hospital = {
  id: string;
  long: number;
  lat: number;
};

// type Direction = {
//   routes: {
//     geometry: {
//       coordinates: [number, number][];
//     };
//     duration: number;
//     distance: number;
//   }[];
// } | null;
type Direction = {
  routes: {
    legs: {
      steps: {
        maneuver: {
          instruction: string;
          location: [number, number];
        };
      }[];
    }[];
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
  journeyStarted: boolean;
  startJourney: () => void;
};

const HospitalContext = createContext<HospitalContextType | undefined>(
  undefined
);

export default function HospitalProvider({ children }: PropsWithChildren<{}>) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>(undefined);
  const [direction, setDirection] = useState<Direction>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [lastSpokenIndex, setLastSpokenIndex] = useState(-1);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const speakDirection = (instruction: string) => {
      Speech.speak(instruction);
    };

    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    
      subscription = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        async (newLocation) => {
          if (!selectedHospital || !direction || !journeyStarted) return;
    
          const from = point([
            newLocation.coords.longitude,
            newLocation.coords.latitude,
          ]);
          const to = point([selectedHospital.long, selectedHospital.lat]);
          const distanceToHospital = getDistance(from, to, { units: "meters" });
          setIsNearby(distanceToHospital < 100);
    
          const routeSteps = direction.routes[0]?.legs[0]?.steps || [];
          const currentStep = routeSteps.findIndex((step: { maneuver: { location: number[]; }; }) => {
            // Check if the current location is near the point for the step
            return getDistance(from, point([step.maneuver.location[0], step.maneuver.location[1]]), { units: 'meters' }) < 20;
          });
    
          if (currentStep !== -1 && currentStep > lastSpokenIndex) {
            setLastSpokenIndex(currentStep);
            const instruction = routeSteps[currentStep]?.maneuver.instruction || "Continue on the road.";
            speakDirection(instruction);
          }
    
          if (isNearby) {
            speakDirection("You have arrived at your destination.");
            subscription?.remove();
          }
        }
      );
    };
    

    if (selectedHospital && journeyStarted) {
      watchLocation();
    }

    return () => {
      subscription?.remove();
    };
  }, [selectedHospital, direction, lastSpokenIndex, journeyStarted, isNearby]);

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
      setJourneyStarted(false);
    }
  }, [selectedHospital]);

  const startJourney = () => {
    setJourneyStarted(true);
    setLastSpokenIndex(-1); // Reset to -1 to ensure the first instruction is spoken
  };

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
        journeyStarted,
        startJourney,
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
