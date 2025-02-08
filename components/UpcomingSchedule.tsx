import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { router } from "expo-router";

const isAndroid = Platform.OS === "android";

const UpcomingSchedule = () => {
  return (
    <View>
      <Pressable onPress={() => router.push("/(authenticated)/(schedules)/[id]")}>
        <View style={styles.container}>
          <LinearGradient
            colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0527, 0.9575]}
            style={styles.linearGradient}
          >
            <View style={styles.flex_items}>
              <View style={styles.img_container}>
                <Image
                  source={require("@/assets/images/doctor.jpg")}
                  style={styles.doctor_img}
                />
              </View>
              <View>
                <Text
                  style={[
                    styles.doctor_name,
                    isAndroid ? { fontSize: 16, lineHeight: 20 } : null,
                  ]}
                >
                  Doctor Mathew Lewis
                </Text>
                <Text
                  style={[
                    styles.occupation,
                    isAndroid ? { fontSize: 14, lineHeight: 18 } : null,
                  ]}
                >
                  Heart Specialist
                </Text>
              </View>
              <View style={styles.camera_holder}>
                <Image
                  source={require("@/assets/images/camera-icon.png")}
                  style={styles.camera_icon}
                />
              </View>
            </View>

            <View style={styles.schedule}>
              <LinearGradient
                colors={[
                  "#35445F",
                  "rgba(11, 17, 26, 0.62)",
                  "rgba(11, 16, 26, 0.61)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.innerGradient}
              >
                <Text
                  style={[styles.time, isAndroid ? { fontSize: 13 } : null]}
                >
                  Sun, Jun 10, 08:00 am - 10:00 am
                </Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    height: 210,
    marginHorizontal: 12,
    borderRadius: 32,
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 17,
    // justifyContent: "center",
    // alignItems: "center",
  },
  doctor_img: {
    width: 90,
    height: 125,
    resizeMode: "cover",
    borderRadius: 13,
  },

  img_container: {
    borderRadius: 13,
    width: 85,
    height: 85,
    overflow: "hidden",
    marginRight: 8,
  },

  camera_holder: {
    width: 37,
    height: 37,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  camera_icon: {
    width: 22,
    height: 22,
  },

  doctor_name: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 23.68 /* 23.68px */,
  },

  occupation: {
    color: "rgba(255, 255, 255, 0.75)",
    // font-family: Lato;

    marginTop: 6,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.72 /* 20.72px */,
  },

  flex_items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  schedule: {
    borderRadius: 25,
    marginTop: 15,
    // backgroundColor: "#fff",
    width: "100%",
    height: 77,
    justifyContent: "center",
  },

  time: {
    color: "#fff",
    // fontFamily: Lato,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22.2,
    textAlign: "center",
  },

  innerGradient: {
    width: "100%",
    height: 77,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default UpcomingSchedule;
