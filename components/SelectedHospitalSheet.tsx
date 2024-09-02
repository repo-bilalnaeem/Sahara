import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useHospital } from "@/providers/HospitalProvider";
import scooterImage from "../assets/scooter.png"; // Ensure correct path
import * as Speech from "expo-speech";
import * as Location from "expo-location";
import { FontAwesome6 } from "@expo/vector-icons";

const SelectedHospitalSheet = () => {
  const {
    selectedHospital,
    duration,
    distance,
    direction,
    journeyStarted,
    startJourney,
  } = useHospital();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (selectedHospital) {
      bottomSheetRef.current?.expand();
      // if (direction) {
      //   // Update duration and distance when a hospital is selected
      //   console.log('Distance:', (distance! / 1000).toFixed(1), 'km');
      //   console.log('Duration:', (duration! / 60).toFixed(1), 'min');
      // }
    }
  }, [selectedHospital, direction]);

  useEffect(() => {
    if (journeyStarted && direction) {
      const routeSteps = direction.routes[0]?.legs[0]?.steps || [];
      handleNextDirection(routeSteps);
    } else {
      // Clean up location subscription if journey is not started
      locationSubscription?.remove();
      setLocationSubscription(null);
    }
  }, [direction, journeyStarted]);

  const handleNextDirection = (routeSteps: any[]) => {
    if (currentStepIndex < routeSteps.length && !isSpeaking) {
      const currentStep = routeSteps[currentStepIndex];
      const instruction =
        currentStep.maneuver.instruction || "Continue on the road.";
      setIsSpeaking(true);
      Speech.speak(instruction, {
        onDone: () => {
          setIsSpeaking(false);
          setCurrentStepIndex((prevIndex) => prevIndex + 1);
          monitorUserLocation(routeSteps); // Continue monitoring location
        },
      });
    }
  };

  const monitorUserLocation = async (routeSteps: any[]) => {
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        const currentStep = routeSteps[currentStepIndex];
        const { latitude, longitude } = location.coords;
        const [stepLon, stepLat] = currentStep.maneuver.location;

        if (isCloseToNextStep(latitude, longitude, stepLat, stepLon)) {
          subscription.remove(); // Stop watching location
          handleNextDirection(routeSteps); // Move to the next direction
        }
      }
    );
    setLocationSubscription(subscription);
  };

  const isCloseToNextStep = (
    currentLat: number,
    currentLon: number,
    stepLat: number,
    stepLon: number,
    threshold: number = 50
  ) => {
    const distance = Math.sqrt(
      Math.pow(currentLat - stepLat, 2) + Math.pow(currentLon - stepLon, 2)
    );
    return distance <= threshold / 100000; // Adjust threshold as needed
  };

  const handleStartJourney = () => {
    setCurrentStepIndex(0);
    startJourney();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
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
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                Lime - S
              </Text>
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
            <Button title="Start journey" onPress={handleStartJourney} />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

export default SelectedHospitalSheet;
