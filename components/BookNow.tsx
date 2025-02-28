import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BookSlider from "./BookSlider";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  item: {
    doctor: {
      doctorId: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      country: string;
      city: string;
      postalCode: number;
      imageUrl: string;
      department: string;
      experience: number;
      fees: number;
      aboutMe: string;
    };
  };
  index: number;
  style: Boolean;
}

const BookNow = ({ item: { doctor }, index, style }: Props) => {
  const { doctorId, firstName, lastName, department, imageUrl } = doctor;
  return (
    <View
      style={[index === 0 ? { paddingLeft: 12 } : undefined]}
      key={doctorId}
    >
      <LinearGradient
        colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0527, 0.9575]}
        style={[
          styles.booknow_Gradient,
          style ? { width: wp("100%") - 24 } : null,
          index === 0 ? { paddingLeft: 12 } : undefined,
        ]}
      >
        <View style={[styles.name_image]}>
          <View
            style={[style ? { paddingHorizontal: 8, paddingVertical: 8 } : {}]}
          >
            <Text style={[styles.doctor_name]}>
              {style
                ? `Dr ${firstName} ${lastName}`
                : `Dr ${firstName}
              {"\n"}
              ${lastName}`}
            </Text>

            <Text style={[styles.occupation]}>{department}</Text>
          </View>
          <View style={styles.image_container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        </View>

        <View style={styles.book_and_nav}>
          <BookSlider name={"Book Now"} />

          <View style={[styles.navigation_button]}>
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/(authenticated)/(doctor)/[id]",
                  params: { id: doctorId }, // Pass params as an object
                })
              }
            >
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
    width: wp("75%"),
  },

  name_image: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  doctor_name: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 28,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    // width: "50%",
  },

  occupation: {
    marginLeft: 10,
    color: "#FFF",
    // font-family: Lato,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 30.2 /* 30.2px */,
  },

  image_container: {
    width: wp("30%"),
    height: hp("13%"),
    borderRadius: 29,
    overflow: "hidden",
  },

  image: {
    width: wp("30%"),
    height: hp("20%"),
    objectFit: "cover",
  },

  book_and_nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navigation_button: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    display: "flex",
    transform: [{ rotate: "-135deg" }],
  },

  nav: {
    width: 24,
    height: 24,
  },
});

export default BookNow;
