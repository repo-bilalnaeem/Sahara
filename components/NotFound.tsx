import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GlassmorphicView = () => (
  <View style={styles.glassContainer}>
    <Image
      source={require("@/assets/images/Search-PNG.png")}
      style={styles.image}
    />
  </View>
);

const NotFound = () => {
  const isDarkMode = useColorScheme() === "dark";
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, justifyContent: "center", top: top  }}>
      <GlassmorphicView />
      <View style={{ flex: 0.4, justifyContent: "center" }}>
        <Text style={isDarkMode ? styles.notFoundLight : styles.notFoundDark}>
          Not Found
        </Text>
        <Text
          style={
            isDarkMode ? styles.notFoundTextLight : styles.notFoundTextDark
          }
        >
          Sorry, the keyword you entered could not{"\n"}be found, please check
          again or search{"\n"}with another keyword.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notFoundLight: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
    color: "#fff",
  } as TextStyle,

  notFoundDark: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
  } as TextStyle,

  notFoundTextLight: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,

  notFoundTextDark: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,

  glassContainer: {
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 36,
    padding: 20,
    paddingBottom: 0,
    elevation: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    resizeMode: "contain",
  },
});

export default NotFound;
