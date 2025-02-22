import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { PixelRatio } from "react-native";
interface TitleProps {
  title: string | undefined;
}
const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const GoBack = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPressIn={router.back} style={[styles.darkBackButton]}>
      <Image
        style={[
          { width: wp("3.5%") },
          { height: hp("3%") },
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
    width: wp("8.5%"),
    height: hp("4%"),
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
