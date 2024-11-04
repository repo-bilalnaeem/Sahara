import React from "react";
import { Stack } from "expo-router";
import HospitalProvider from "@/providers/HospitalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PharmacyHeader from "@/components/PharmacyHeader";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native-animatable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBack from "@/components/GoBack";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HospitalProvider>
        <Stack>
          <Stack.Screen
            name="emergency"
            options={{
              headerShadowVisible: false,
              // headerShown: false,
              navigationBarHidden: true,
              headerBackVisible: true,
              headerTransparent: true,
              // headerLeft: () => <GoBack title={undefined} />,
              header: () => (
                <View
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: "center",
                    paddingTop: 65,
                  }}
                >
                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    styles={{
                      container: {
                        flex: 0,
                      },
                    }}
                    onPress={(data, details = null)=>{
                      console.log(data)
                      console.log(details)
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                      key: "AIzaSyC7JYYXDCvta4nJW-PCvBWvc6_XyeNiSyY",
                      language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                  />
                </View>
              ),
            }}
          />

          <Stack.Screen name="(pharmacy)" options={{ headerShown: false }} />

          <Stack.Screen name="(shops)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(product)"
            options={{
              headerShown: false,
              // presentation: "containedModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="(category)" options={{ headerShown: false }} />
          <Stack.Screen name="(laboratory)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(cart)"
            options={{ animation: "slide_from_bottom", headerShown: false }}
          />
          <Stack.Screen
            name="(booking)"
            options={{ headerShown: false, animation: "slide_from_bottom" }}
          />
        </Stack>
      </HospitalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
