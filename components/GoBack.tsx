import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useRouter } from "expo-router";
import { PixelRatio } from "react-native";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const GoBack = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPressIn={router.back} style={[styles.darkBackButton]}>
      <Image
        style={[
          { width: wp("4%") },
          { height: hp("4%") },
          { tintColor: "#fff", objectFit: "contain" },
        ]}
        source={require("@/assets/images/arrow.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkBackButton: {
    borderRadius: 24,
    width: wp("11%"),
    height: hp("5%"),
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  screenNameDark: {
    color: "#1E1F22",
    fontSize: scaleFont(20),
    fontStyle: "normal",
    fontWeight: "500",
  },
});

export default GoBack;
