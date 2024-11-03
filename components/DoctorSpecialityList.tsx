import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
  useColorScheme,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { doctorTypes } from "@/assets/data/HomePageData";
import { router } from "expo-router";
import MeetDoctor from "./MeetDoctor";

const isAndroid = Platform.OS === "android";

const renderDoctorFields = ({ item, index }: any) => {
  return (
    <Pressable onPress={() => router.navigate("/")}>
      <View
        style={[
          styles.doctorService,
          index === 6 || index === 0 ? { marginLeft: 16 } : null,
        ]}
      >
        <Image source={item.imageSource} style={styles.service_icons} />
        <Text
          style={[
            styles.doctorServiceText,
            isAndroid ? { fontSize: 11 } : null,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </Pressable>
  );
};

const DoctorSpecialityList = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <>
      <View style={[styles.services]}>
        <Text
          style={[
            isDarkMode ? styles.discountLight : styles.discountDark,
            isAndroid ? { fontSize: 14 } : null,
          ]}
        >
          Doctor's Speciality
        </Text>
        <Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              bounces={false}
              numColumns={6}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              data={doctorTypes}
              renderItem={renderDoctorFields}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false} // Hide the horizontal scroll bar
            />
          </ScrollView>
        </Pressable>
      </View>
      <MeetDoctor />
    </>
  );
};

const styles = StyleSheet.create({
  doctorService: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    marginRight: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  service_icons: {
    width: 30,
    height: 30,
  },

  doctorServiceText: {
    color: "#333",
    // text-align: center;
    // font-family: Lato;
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    // marginTop: 5,
  },

  meetDoctor: {
    marginHorizontal: 23,
    // marginTop: 24,
  },

  meetDoctorHeadingWhite: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 18,
    color: "#fff",
  },

  meetDoctorHeadingDark: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 18,
  },

  searchbarBox: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 30,
    elevation: 5, // or use shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.54,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    paddingLeft: 20,
  },

  doctorSearch: {
    fontSize: 15,
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
  },

  services: {
    marginBottom: 38,
  },

  discountDark: {
    color: "#000",
    // font-family: Lato;
    // fontSize: 18,
    // fontWeight: "500",
    // lineHeight: 22 /* 110% */,
    marginHorizontal: 23,
    marginBottom: 27,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  discountLight: {
    color: "#FFF",
    // font-family: Lato;
    // fontSize: 18,
    // fontWeight: "500",
    // lineHeight: 22 /* 110% */,
    marginHorizontal: 23,
    marginBottom: 27,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
});

export default DoctorSpecialityList;
