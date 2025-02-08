import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BookSlider from "./BookSlider";
import { Link, router } from "expo-router";

const isAndroid = Platform.OS === "android";

interface Props {
  item: {
    doctorId: string;
    firstName: string;
    lastName: string;
    department: string;
    imageUrl: string;
  };
  index: number;
}

const BookNow = ({ item, index }: Props) => {
  const { doctorId, firstName, lastName, department, imageUrl } = item;
  return (
    <View
      style={[
        index === 0 ? { paddingLeft: 12 } : undefined,
        isAndroid ? { minWidth: 355 } : null,
      ]}
      key={doctorId}
    >
      <LinearGradient
        colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0527, 0.9575]}
        style={[
          styles.booknow_Gradient,
          index === 0 ? { paddingLeft: 12 } : undefined,
        ]}
      >
        <View style={styles.name_image}>
          <View>
            <Text
              style={[
                styles.doctor_name,
                isAndroid ? { fontSize: 16, lineHeight: 24 } : null,
              ]}
            >
              Dr {firstName} {lastName}
            </Text>

            <Text
              style={[
                styles.occupation,
                isAndroid ? { fontSize: 13, lineHeight: 22 } : null,
              ]}
            >
              {department}
            </Text>
          </View>
          <View style={styles.image_container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        </View>

        <View style={styles.book_and_nav}>
          <BookSlider name={"Book Now"} />

          <View style={[styles.navigation_button]}>
            <TouchableOpacity onPress={() => router.navigate("/(doctor)/1")}>
              <Image
                source={require("@/assets/images/arrow-needle.png")}
                style={styles.nav}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  booknow_Gradient: {
    borderRadius: 40,
    paddingTop: 18,
    paddingBottom: 14,
    paddingLeft: 12,
    paddingRight: 14,
    marginRight: 12,
  },

  name_image: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  doctor_name: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 36.24 /* 36.24px */,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    width: 140,
  },

  occupation: {
    marginLeft: 10,
    color: "#FFF",
    // font-family: Lato,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 30.2 /* 30.2px */,
  },

  image_container: {
    width: 129,
    height: 129,
    borderRadius: 29,
    overflow: "hidden",
  },

  image: {
    width: 129,
    height: 175,
    // objectFit: "contain",
  },

  book_and_nav: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },

  navigation_button: {
    width: 61,
    height: 61,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    display: "flex",
    transform: [{ rotate: "-135deg" }],
  },

  nav: {
    width: 30,
    height: 30,
  },
});

export default BookNow;
