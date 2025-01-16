import React from "react";

import {
  View,
  Pressable,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";

const MediaIcons = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.loginIcons}>
      <Pressable
        style={isDarkMode ? styles.darkloginIcons : styles.lightloginIcons}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={require("@/assets/images/Apple-Icon.png")}
        />
      </Pressable>
      <Pressable
        style={[
          isDarkMode ? styles.darkloginIcons : styles.lightloginIcons,
          styles.middle_icon,
        ]}
      >
        <Image
          style={{ width: 28, height: 28 }}
          source={require("@/assets/images/Google-Icon.png")}
        />
      </Pressable>
    </View>
  );
};

export default MediaIcons;

const styles = StyleSheet.create({
  loginIcons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  middle_icon: {
    marginHorizontal: 14,
  },
  lightloginIcons: {
    width: 90,
    height: 68,
    borderRadius: 17,
    borderColor: "#7593BD",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  darkloginIcons: {
    width: 90,
    height: 68,
    borderRadius: 17,
    borderColor: "#CCC",
    backgroundColor: "transparent",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
});
