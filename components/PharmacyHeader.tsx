import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const PharmacyHeader = () => {
  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <LinearGradient
      colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
      style={[styles.linearGradient, { paddingTop: top }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.0527, 0.9575]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={router.back}
            style={[
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
          <View>
            <Text style={[{ fontSize: 16, color: "#fff", fontWeight: "600" }]}>
              77 7th Lane
            </Text>
            <Text style={[{ fontSize: 14, color: "#fff", fontWeight: "400" }]}>
              Karachi
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 20 }}>
          <Ionicons
            name="heart-outline"
            size={22}
            color={"#fff"}
            style={{ marginBottom: 5 }}
          />
          <Ionicons
            name="bag-outline"
            size={22}
            color={"#fff"}
            style={{ marginBottom: 5 }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <Ionicons
            // style={styles.searchIcon}
            name="search"
            size={20}
            color={"#505153"}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for items & medicine"
            placeholderTextColor={"#696a6e"}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    // height: 80,
    backgroundColor: "transparent",
    paddingHorizontal: 14,
    marginVertical: 10,
  },

  addressSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ebebeb",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#000",
    fontWeight: "500",
  },
  address: {
    flex: 1,
    paddingTop: 10,

    color: "#fff",
    fontWeight: "500",
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

export default PharmacyHeader;
