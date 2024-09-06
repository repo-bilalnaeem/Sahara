import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface TitleProps {
  title: string | undefined;
}

const GoBack = ({ title }: TitleProps) => {
  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={router.back}
      style={[
        { top, marginHorizontal: 13 },
        isDarkMode ? styles.lightBackButton : styles.darkBackButton,
      ]}
    >
      <Image
        style={[
          { width: 20 },
          { height: 20 },
          isDarkMode ? null : { tintColor: "#fff" },
        ]}
        source={require("@/assets/images/arrow.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lightBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  darkBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  screenNameLight: {
    // color: "#000",
    color: "#FFF",
    // font-family: Lato;
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },
  screenNameDark: {
    // color: "#000",
    color: "#1E1F22",

    // font-family: Lato;
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },
});

export default GoBack;
