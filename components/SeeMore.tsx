import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

type Props = {
  heading: string;
};

const SeeMore = ({ heading }: Props) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.flex_headings}>
      <Text style={isDarkMode ? styles.lightHeading : styles.darkHeading}>
        {heading}
      </Text>
      <Pressable>
        <Text style={isDarkMode ? styles.seeAllLight : styles.seeAllDark}>
          See All
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  flex_headings: {
    justifyContent: "space-between",
    marginHorizontal: 23,
    flexDirection: "row",
    marginBottom: 26,
  },

  darkHeading: {
    color: "#000",
    // textAlign: "center",
    // font-family: Lato,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 122.222% */,
  },

  lightHeading: {
    color: "#FFF",
    // textAlign: "center",
    // font-family: Lato,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 122.222% */,
  },

  seeAllDark: {
    color: "rgba(0, 0, 0, 0.50)",
    // text-align: center;
    // font-family: Lato;
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22 /* 137.5% */,
  },
  seeAllLight: {
    color: "rgba(255, 255, 255, 0.50)",
    // text-align: center;
    // font-family: Lato;
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22 /* 137.5% */,
  },
});

export default SeeMore;
