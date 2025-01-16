import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native-animatable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useDispatch } from "react-redux";
import { setDestination } from "@/slices/navSlice";

const Layout = () => {
  const { top } = useSafeAreaInsets();
  // const dispatch = useDispatch();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                  justifyContent: "space-between",
                  paddingTop: top * 1.75,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginTop: 20,
                  }}
                >
                  <GooglePlacesAutocomplete
                    placeholder="Search"
                    styles={{
                      container: {
                        flex: 0,
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
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                  />
                </View>
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

        <Stack.Screen name="(consultation)" options={{headerShown: false}}/>
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
