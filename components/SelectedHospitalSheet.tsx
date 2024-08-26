// // // import { View, Text, Image } from "react-native";
// // // import React, { useEffect, useRef } from "react";
// // // import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// // // import { useHospital } from "@/providers/HospitalProvider";
// // // import scooterImage from "@/assets/scooter.png";
// // // import { FontAwesome6 } from "@expo/vector-icons";
// // // import { Button } from "./Button";
// // // import * as Speech from "expo-speech";
// // // import * as Location from "expo-location";

// // // const SelectedHospitalSheet = () => {
// // //   const {
// // //     selectedHospital,
// // //     duration,
// // //     distance,
// // //     directionCoordinates,
// // //     isNearby,
// // //   } = useHospital();
// // //   const BottomSheetRef = useRef<BottomSheet>(null);

// // //   useEffect(() => {
// // //     if (selectedHospital) {
// // //       BottomSheetRef.current?.expand();
// // //     }
// // //   }, [selectedHospital]);

// // //   const startNavigation = async () => {
// // //     // Request background location permissions
// // //     const { status } = await Location.requestForegroundPermissionsAsync();
// // //     if (status !== "granted") {
// // //       console.log("Permission to access location was denied");
// // //       return;
// // //     }

// // //     if (directionCoordinates) {
// // //       // Start speech direction
// // //       directionCoordinates.forEach(async ([longitude, latitude]) => {
// // //         const location = await Location.reverseGeocodeAsync({
// // //           longitude,
// // //           latitude,
// // //         });
// // //         const address = location[0]?.street;
// // //         const instruction = `Proceed to ${address}.`;
// // //         Speech.speak(instruction);
// // //       });

// // //       // If the user is near the hospital, give a final direction
// // //       if (isNearby) {
// // //         Speech.speak("You have arrived at your destination.");
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <BottomSheet
// // //       ref={BottomSheetRef}
// // //       index={-1}
// // //       snapPoints={[200]}
// // //       backgroundStyle={{ backgroundColor: "#414442" }}
// // //       enablePanDownToClose
// // //     >
// // //       {selectedHospital && (
// // //         <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
// // //           <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
// // //             <Image source={scooterImage} style={{ width: 60, height: 60 }} />
// // //             <View style={{ flex: 1 }}>
// // //               {/* <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>{selectedHospital.name}</Text> */}
// // //               <Text style={{ color: "gray", fontSize: 14 }}>
// // //                 id-{selectedHospital.id} · Madison Avenue
// // //               </Text>
// // //             </View>
// // //             <View style={{ gap: 5 }}>
// // //               <View
// // //                 style={{
// // //                   flexDirection: "row",
// // //                   alignItems: "center",
// // //                   gap: 5,
// // //                   alignSelf: "flex-start",
// // //                 }}
// // //               >
// // //                 <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
// // //                 <Text
// // //                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
// // //                 >
// // //                   {(distance! / 1000).toFixed(1)} km
// // //                 </Text>
// // //               </View>
// // //               <View
// // //                 style={{
// // //                   flexDirection: "row",
// // //                   alignItems: "center",
// // //                   gap: 5,
// // //                   alignSelf: "flex-start",
// // //                 }}
// // //               >
// // //                 <FontAwesome6 name="clock" size={18} color="#42E100" />
// // //                 <Text
// // //                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
// // //                 >
// // //                   {(duration! / 60).toFixed(1)} min
// // //                 </Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View>
// // //             <Button
// // //               title="Start journey"
// // //               onPress={startNavigation}
// // //               disabled={isNearby}
// // //             />
// // //           </View>
// // //         </BottomSheetView>
// // //       )}
// // //     </BottomSheet>
// // //   );
// // // };

// // // export default SelectedHospitalSheet;
// // import { View, Text, Image } from "react-native";
// // import React, { useEffect, useRef } from "react";
// // import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// // import { useHospital } from "@/providers/HospitalProvider";
// // import scooterImage from "@/assets/scooter.png";
// // import { FontAwesome6 } from "@expo/vector-icons";
// // import { Button } from "./Button";
// // import * as Speech from "expo-speech";
// // import * as Location from "expo-location";

// // const SelectedHospitalSheet = () => {
// //   const {
// //     selectedHospital,
// //     duration,
// //     distance,
// //     directionCoordinates,
// //     isNearby,
// //     direction, // Assuming direction is provided by the useHospital hook or context
// //   } = useHospital();
// //   const BottomSheetRef = useRef<BottomSheet>(null);

// //   useEffect(() => {
// //     if (selectedHospital) {
// //       BottomSheetRef.current?.expand();
// //     }
// //   }, [selectedHospital]);

// //   const directionQueue: { instruction: string; onFinish?: () => void }[] = [];

// //   const speakNextDirection = () => {
// //     const nextDirection = directionQueue.shift();
// //     if (nextDirection) {
// //       Speech.speak(nextDirection.instruction, {
// //         onDone: nextDirection.onFinish,
// //       });
// //     }
// //   };

// //   const startNavigation = async () => {
// //     // Request foreground location permissions
// //     const { status } = await Location.requestForegroundPermissionsAsync();
// //     if (status !== "granted") {
// //       console.log("Permission to access location was denied");
// //       return;
// //     }

// //     if (direction) {
// //       // Add directions to the queue
// //       const routeSteps = direction.routes[0]?.legs[0]?.steps || [];
// //       for (const step of routeSteps) {
// //         const instruction =
// //           step.maneuver.instruction || "Continue on the road.";
// //         directionQueue.push({
// //           instruction,
// //           onFinish: speakNextDirection, // Continue to the next direction when this one finishes
// //         });
// //       }

// //       // Start speaking the first direction
// //       speakNextDirection();

// //       // If the user is near the hospital, give a final direction
// //       if (isNearby) {
// //         directionQueue.push({
// //           instruction: "You have arrived at your destination.",
// //         });
// //         // Start speaking the final direction if it's the only one left
// //         if (directionQueue.length === 1) {
// //           speakNextDirection();
// //         }
// //       }
// //     }
// //   };

// //   return (
// //     <BottomSheet
// //       ref={BottomSheetRef}
// //       index={-1}
// //       snapPoints={[200]}
// //       backgroundStyle={{ backgroundColor: "#414442" }}
// //       enablePanDownToClose
// //     >
// //       {selectedHospital && (
// //         <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
// //           <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
// //             <Image source={scooterImage} style={{ width: 60, height: 60 }} />
// //             <View style={{ flex: 1 }}>
// //               <Text style={{ color: "gray", fontSize: 14 }}>
// //                 id-{selectedHospital.id} · Madison Avenue
// //               </Text>
// //             </View>
// //             <View style={{ gap: 5 }}>
// //               <View
// //                 style={{
// //                   flexDirection: "row",
// //                   alignItems: "center",
// //                   gap: 5,
// //                   alignSelf: "flex-start",
// //                 }}
// //               >
// //                 <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
// //                 <Text
// //                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
// //                 >
// //                   {(distance! / 1000).toFixed(1)} km
// //                 </Text>
// //               </View>
// //               <View
// //                 style={{
// //                   flexDirection: "row",
// //                   alignItems: "center",
// //                   gap: 5,
// //                   alignSelf: "flex-start",
// //                 }}
// //               >
// //                 <FontAwesome6 name="clock" size={18} color="#42E100" />
// //                 <Text
// //                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
// //                 >
// //                   {(duration! / 60).toFixed(1)} min
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>
// //           <View>
// //             <Button
// //               title="Start journey"
// //               onPress={startNavigation}
// //               disabled={isNearby}
// //             />
// //           </View>
// //         </BottomSheetView>
// //       )}
// //     </BottomSheet>
// //   );
// // };

// // export default SelectedHospitalSheet;
// import { View, Text, Image } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
// import { useHospital } from "@/providers/HospitalProvider";
// import scooterImage from "@/assets/scooter.png";
// import { FontAwesome6 } from "@expo/vector-icons";
// import { Button } from "./Button";
// import * as Speech from "expo-speech";
// import * as Location from "expo-location";

// const SelectedHospitalSheet = () => {
//   const {
//     selectedHospital,
//     duration,
//     distance,
//     directionCoordinates,
//     isNearby,
//     direction, // Assuming direction is provided by the useHospital hook or context
//   } = useHospital();
//   const BottomSheetRef = useRef<BottomSheet>(null);
//   const [currentDirectionIndex, setCurrentDirectionIndex] = useState(0);
//   const [directionQueue, setDirectionQueue] = useState<{ instruction: string }[]>([]);

//   useEffect(() => {
//     if (selectedHospital) {
//       BottomSheetRef.current?.expand();
//     }
//   }, [selectedHospital]);

//   useEffect(() => {
//     if (direction) {
//       // Update direction queue when direction data changes
//       const routeSteps = direction.routes[0]?.legs[0]?.steps || [];
//       const newDirectionQueue = routeSteps.map(step => ({
//         instruction: step.maneuver.instruction || "Continue on the road.",
//       }));
//       setDirectionQueue(newDirectionQueue);
//       setCurrentDirectionIndex(0);
//     }
//   }, [direction]);

//   useEffect(() => {
//     if (currentDirectionIndex < directionQueue.length) {
//       // Speak the current direction instruction
//       const currentDirection = directionQueue[currentDirectionIndex];
//       Speech.speak(currentDirection.instruction, {
//         onDone: () => {
//           // Move to the next instruction when the current one is finished
//           setCurrentDirectionIndex(prevIndex => prevIndex + 1);
//         },
//       });
//     } else if (isNearby) {
//       // If the user is near the hospital, give a final direction
//       Speech.speak("You have arrived at your destination.");
//     }
//   }, [currentDirectionIndex, directionQueue, isNearby]);

//   const startNavigation = async () => {
//     // Request foreground location permissions
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       console.log("Permission to access location was denied");
//       return;
//     }

//     // The direction queue will be updated automatically via the useEffect hook
//   };

//   return (
//     <BottomSheet
//       ref={BottomSheetRef}
//       index={-1}
//       snapPoints={[200]}
//       backgroundStyle={{ backgroundColor: "#414442" }}
//       enablePanDownToClose
//     >
//       {selectedHospital && (
//         <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//             <Image source={scooterImage} style={{ width: 60, height: 60 }} />
//             <View style={{ flex: 1 }}>
//               <Text style={{ color: "gray", fontSize: 14 }}>
//                 id-{selectedHospital.id} · Madison Avenue
//               </Text>
//             </View>
//             <View style={{ gap: 5 }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: 5,
//                   alignSelf: "flex-start",
//                 }}
//               >
//                 <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
//                 <Text
//                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
//                 >
//                   {(distance! / 1000).toFixed(1)} km
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   gap: 5,
//                   alignSelf: "flex-start",
//                 }}
//               >
//                 <FontAwesome6 name="clock" size={18} color="#42E100" />
//                 <Text
//                   style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
//                 >
//                   {(duration! / 60).toFixed(1)} min
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View>
//             <Button
//               title="Start journey"
//               onPress={startNavigation}
//               disabled={isNearby}
//             />
//           </View>
//         </BottomSheetView>
//       )}
//     </BottomSheet>
//   );
// };

// export default SelectedHospitalSheet;
import { View, Text, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useHospital } from "@/providers/HospitalProvider";
import scooterImage from "@/assets/scooter.png";
import { FontAwesome6 } from "@expo/vector-icons";
import { Button } from "./Button";
import * as Speech from "expo-speech";
import * as Location from "expo-location";

const SelectedHospitalSheet = () => {
  const {
    selectedHospital,
    duration,
    distance,
    directionCoordinates,
    isNearby,
    direction, // Assuming direction is provided by the useHospital hook or context
  } = useHospital();
  const BottomSheetRef = useRef<BottomSheet>(null);
  const [currentDirectionIndex, setCurrentDirectionIndex] = useState(0);
  const [directionQueue, setDirectionQueue] = useState<{ instruction: string }[]>([]);
  const [navigationStarted, setNavigationStarted] = useState(false);

  useEffect(() => {
    if (selectedHospital) {
      BottomSheetRef.current?.expand();
    }
  }, [selectedHospital]);

  useEffect(() => {
    if (direction && navigationStarted) {
      // Update direction queue when direction data changes and navigation has started
      const routeSteps = direction.routes[0]?.legs[0]?.steps || [];
      const newDirectionQueue = routeSteps.map(step => ({
        instruction: step.maneuver.instruction || "Continue on the road.",
      }));
      setDirectionQueue(newDirectionQueue);
      setCurrentDirectionIndex(0);
    }
  }, [direction, navigationStarted]);

  useEffect(() => {
    if (navigationStarted && currentDirectionIndex < directionQueue.length) {
      // Speak the current direction instruction
      const currentDirection = directionQueue[currentDirectionIndex];
      Speech.speak(currentDirection.instruction, {
        onDone: () => {
          // Move to the next instruction when the current one is finished
          setCurrentDirectionIndex(prevIndex => prevIndex + 1);
        },
      });
    } else if (navigationStarted && isNearby) {
      // If the user is near the hospital, give a final direction
      Speech.speak("You have arrived at your destination.");
    }
  }, [currentDirectionIndex, directionQueue, isNearby, navigationStarted]);

  const startNavigation = async () => {
    // Request foreground location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    // Mark navigation as started
    setNavigationStarted(true);
  };

  return (
    <BottomSheet
      ref={BottomSheetRef}
      index={-1}
      snapPoints={[200]}
      backgroundStyle={{ backgroundColor: "#414442" }}
      enablePanDownToClose
    >
      {selectedHospital && (
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image source={scooterImage} style={{ width: 60, height: 60 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "gray", fontSize: 14 }}>
                id-{selectedHospital.id} · Madison Avenue
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
                >
                  {(distance! / 1000).toFixed(1)} km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome6 name="clock" size={18} color="#42E100" />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
                >
                  {(duration! / 60).toFixed(1)} min
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button
              title="Start journey"
              onPress={startNavigation}
              disabled={isNearby}
            />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

export default SelectedHospitalSheet;
