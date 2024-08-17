import React from "react";
import { View, Text, Platform } from "react-native";
import Map from "@/components/Map";

const Emergency = () => {
  return (
    <View>
      {/* Optionally display a message or alternative content for iOS users */}
      <Text>Map is not available on iOS</Text>
    </View>
  );
};

export default Emergency;
