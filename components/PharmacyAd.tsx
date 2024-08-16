import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";

const PharmacyAd = () => {
  // Define a data array with at least one item
  const data = [
    { id: "1", imageSource: require("@/assets/images/pharmacy_ad1.jpg") },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        overflow: "scroll",
        marginBottom: 24,
      }}
    >
      <View style={styles.image} />
      <View style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 150,
    backgroundColor: "#000",
    borderRadius: 24,
  },
});

export default PharmacyAd;
