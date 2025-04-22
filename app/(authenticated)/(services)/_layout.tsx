// 👇 This must come before importing uuid or anything that uses getRandomValues
import "react-native-get-random-values";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  PixelRatio,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import GoBack from "@/components/GoBack";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination } from "@/slices/navSlice";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const Layout = () => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="emergency"
        options={{
          headerShadowVisible: false,
          // headerShown: false,
          navigationBarHidden: true,
          headerBackVisible: true,
          headerTransparent: true,

          header: () => (
            <View
              style={[
                styles.meetDoctor,
                {
                  paddingTop: top,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                onPressIn={() => router.back()}
                style={[styles.darkBackButton]}
              >
                <Image
                  style={[
                    { width: wp("5%") },
                    { height: hp("2%") },
                    { tintColor: "#6e6e6e", objectFit: "contain" },
                  ]}
                  source={require("@/assets/images/arrow.png")}
                />
              </TouchableOpacity>
              <View style={styles.searchbarBox}>
                <AntDesign name="search1" size={scaleFont(20)} color="#000" />
                <GooglePlacesAutocomplete
                  placeholder="Search nearby Medical Facility"
                  styles={{
                    container: {
                      flex: 1,
                      borderRadius: 30,
                    },
                  }}
                  onPress={(data, details = null) => {
                    dispatch(
                      setDestination({
                        location: details?.geometry.location,
                        description: data.description,
                      })
                    );

                    // dispatch(setDestination(null));
                  }}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  minLength={2}
                  query={{
                    key: "AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY",
                    language: "en",
                    type: "establishment",
                    components: "country:pk",
                  }}
                  GooglePlacesSearchQuery={{
                    rankby: "distance",
                    type: "hospital",
                  }}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={400}
                />
              </View>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="(consultation)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(pharmacy)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(laboratory)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="new-recording"
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  darkBackButton: {
    borderRadius: 24,
    width: wp("3%"),
    height: hp("4%"),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },
  meetDoctor: {
    paddingHorizontal: 13,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  searchTouch: {
    flexGrow: 1,
  },
  searchbarBox: {
    backgroundColor: "#fff",
    height: hp("5.75%"),
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
    fontSize: scaleFont(15),
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
    flexGrow: 1,
  },
});
export default Layout;
