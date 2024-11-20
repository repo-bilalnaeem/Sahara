import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  Platform,
} from "react-native";

type Props = {
  heading: string;
};

const SeeMore = ({ heading }: Props) => {
  const isDarkMode = useColorScheme() === "dark";
  const isAndroid = Platform.OS === "android";

  return (
    <View style={styles.flex_headings}>
      <Text
        style={[
          isDarkMode ? styles.lightHeading : styles.darkHeading,
          isAndroid ? { fontSize: 14 } : null,
        ]}
      >
        {heading}
      </Text>
      <Pressable>
        <Text
          style={[
            isDarkMode ? styles.seeAllLight : styles.seeAllDark,
            isAndroid ? { fontSize: 13 } : null,
          ]}
        >
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
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  lightHeading: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  seeAllDark: {
    color: "rgba(0, 0, 0, 0.50)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  seeAllLight: {
    color: "rgba(255, 255, 255, 0.50)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
});

export default SeeMore;
