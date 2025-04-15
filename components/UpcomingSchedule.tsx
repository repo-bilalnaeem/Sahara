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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { addMinutes, format } from "date-fns";

const isAndroid = Platform.OS === "android";

interface DoctorData {
  doctor: {
    doctorId: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    department: string;
  };
  slot: {
    date: string;
    time: string;
  };
}
interface UpcomingScheduleProps {
  data: DoctorData;
}

import { formatInTimeZone } from "date-fns-tz";
// import { addMinutes } from "date-fns";

const UpcomingSchedule = ({ data }: UpcomingScheduleProps) => {
  // console.log(JSON.stringify(data.doctor, null, 2));
  // const startDate = new Date(data.slot.time);
  // const endDate = addMinutes(startDate, 30); // 30-minute slot

  // const formatted = `${format(startDate, "EEE, MMM d, h:mm a")} - ${format(
  //   endDate,
  //   "h:mm a"
  // )}`;

  const startDate = new Date(data.slot.time);
  const endDate = addMinutes(startDate, 30); // 30-minute slot
  
  const formatted = `${formatInTimeZone(
    startDate,
    "UTC",
    "EEE, MMM d, h:mm a"
  )} - ${formatInTimeZone(endDate, "UTC", "h:mm a")}`;

  return (
    <View style={{ marginBottom: 24 }}>
      <Pressable
        onPress={() =>
          router.push(`/(authenticated)/(schedules)/${data.doctor.doctorId}`)
        }
      >
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
                  source={{ uri: data.doctor.imageUrl }}
                  style={styles.doctor_img}
                />
              </View>
              <View style={{ flexGrow: 1 }}>
                <Text
                  style={[
                    styles.doctor_name,
                    isAndroid ? { fontSize: 16, lineHeight: 20 } : null,
                  ]}
                >
                  Doctor {data.doctor.firstName} {data.doctor.lastName}
                </Text>
                <Text
                  style={[
                    styles.occupation,
                    isAndroid ? { fontSize: 14, lineHeight: 18 } : null,
                  ]}
                >
                  {data.doctor.department}
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
                  {/* Wed, Feb 12, 10:00 am - 10:30 am */}
                  {formatted}
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
    marginHorizontal: 12,
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 10,
  },
  doctor_img: {
    width: wp("20%"),
    height: hp("13%"),
    borderRadius: 13,
    objectFit: "cover",
  },

  img_container: {
    borderRadius: 13,
    width: wp("20%"),
    height: hp("9%"),
    overflow: "hidden",
  },

  camera_holder: {
    width: 32,
    height: 32,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  camera_icon: {
    width: 20,
    height: 20,
    objectFit: "contain",
  },

  doctor_name: {
    color: "#FFF",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 23.68,
  },

  occupation: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.72,
  },

  flex_items: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  schedule: {
    borderRadius: 25,
    marginTop: 16,
    width: "100%",
    justifyContent: "center",
  },

  time: {
    color: "#fff",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22.2,
    textAlign: "center",
  },

  innerGradient: {
    width: "100%",
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default UpcomingSchedule;
