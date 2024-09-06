import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Laboratory = () => {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
      <View style={{ marginTop: top*1.5 }}>
        <LinearGradient
          colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.0527, 0.9575]}
          style={styles.linearGradient}
        >
          <Image
            source={require("@/assets/images/family_img.png")}
            style={{
              width: 160,
              height: 125,
              position: "absolute",
              bottom: 0,
              right: 0,
              objectFit: "scale-down",
            }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#fff",
              lineHeight: 32,
            }}
          >
            Get your full body{"\n"}checkup
          </Text>
          <Text style={{ color: "#d4d4d4", fontSize: 13 }}>
            full body checkup{"\n"}with cancer
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 210,
    marginHorizontal: 12,
    borderRadius: 32,
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 17,
  },

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
});

export default Laboratory;
