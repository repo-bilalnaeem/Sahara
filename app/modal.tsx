import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Modal = () => {
  const isDarkMode = useColorScheme() == "dark";
  const router = useRouter();

  const RESET_PROMPT = "You have successfully reset your password!";

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
          {RESET_PROMPT}
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace("/(authenticated)/(drawer)/(tabs)")}
        >
          <LinearGradient
            colors={["#1661E0", "#478EEF"]}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.LightText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    width: 120,
    height: 120,
    marginTop: "75%",
    // marginBottom: "35%",
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

  linearGradient: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 40,
  },

  LightText: {
    color: "#fff",
    fontSize: 14,
    fontStyle: "normal",
    // marginLeft: 10,
  },
});
