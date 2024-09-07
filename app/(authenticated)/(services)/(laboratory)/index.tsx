import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  testName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#27487e",
  },

  labTestTile: {
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
  },
});

export default index;
