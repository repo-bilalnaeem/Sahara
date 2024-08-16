import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

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

  return (
    <>
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
    </>
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
    backgroundColor: "rgba(107, 107, 107, 0.12)",
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 36,
    padding: 20,
    shadowColor: "#1f2687",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.37,
    shadowRadius: 32,
    elevation: 5,
    overflow: "hidden",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,

  image: {
    height: 150,
    resizeMode: "contain",
  } as ImageStyle,
});

export default NotFound;
