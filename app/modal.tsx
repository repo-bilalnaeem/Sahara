import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import LoginButton from "@/components/LoginButton";

const Modal = () => {
  const isDarkMode = useColorScheme() == "dark";
  const navigation = useNavigation();
  const router = useRouter();

  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (event) => {
      const { routes, index } = event.data.state;
      if (index > 0) {
        setPreviousRoute(routes[index - 1].name);
      } else {
        setPreviousRoute(null);
      }
    });

    return unsubscribe;
  }, [navigation]);

  console.log(previousRoute);

  const handleLoginPress = () => {
    if (previousRoute === "(authenticated)") {
      router.replace("/(tabs)");
    }
    if (previousRoute === "resetPassword") {
      router.navigate("/signin");
    }
  };

  const RESET_PROMPT = "You have successfully reset your password!";
  const REGISTERED_PROMT = "You have successfully been registered!";

  return (
    <View style={[isDarkMode ? styles.modalDark : styles.modalLight]}>
      <View style={styles.modal_inner}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/accept.gif")}
            style={styles.gif}
          />
        </View>
        <Text style={isDarkMode ? styles.successLight : styles.successDark}>
          Success
        </Text>
        <Text style={isDarkMode ? styles.modalTextLight : styles.modalTextDark}>
          {previousRoute === "(authenticated)" && REGISTERED_PROMT}
          {previousRoute === "resetPassword" && RESET_PROMPT}
        </Text>

        <LoginButton onPress={handleLoginPress} text="Continue"></LoginButton>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalLight: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 13,
  },
  modalDark: {
    width: "100%",
    flex: 1,
    backgroundColor: "#1E1F22",
    paddingHorizontal: 13,
  },
  modal_inner: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  gif: {
    width: 140,
    height: 140,
    marginTop: "75%",
    marginBottom: "35%",
  },
  successDark: {
    color: "#4878C9",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 32,
  },
  successLight: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 32,
  },
  modalTextDark: {
    color: "#7B6161",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 28 /* 24px */,
    letterSpacing: 0.5,
    marginBottom: "15%",
    marginHorizontal: 18,
  },
  modalTextLight: {
    color: "#C9C9C9",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 28 /* 24px */,
    letterSpacing: 0.5,
    marginBottom: "15%",
    marginHorizontal: 18,
  },
});
