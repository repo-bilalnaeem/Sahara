import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import PharmacyAd from "@/components/PharmacyAd";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PharmacyCategoryList from "@/components/PharmacyCategoryList";

const Pharmacy = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 13,
        paddingTop: top * 1.5,
      }}
    >
      <Text style={styles.heading}>Welcome!</Text>
      <Text style={{ color: "rgba(0,0,0,0.5)", marginBottom: 32 }}>
        Find Your Required Medicine Here.
      </Text>
      <PharmacyAd />

      <PharmacyCategoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "Lato700",
    marginBottom: 10,
  },
});

export default Pharmacy;
