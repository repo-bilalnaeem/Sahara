import React from "react";
import { Link, Stack } from "expo-router";
import GoBack from "@/components/GoBack";
import HospitalProvider from "@/providers/HospitalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PharmacyHeader from "@/components/PharmacyHeader";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HospitalProvider>
        <Stack
          screenOptions={
            {
              // navigationBarHidden: true,
              // navigationBarColor:'transparent'
            }
          }
        >
          <Stack.Screen
            name="Emergency"
            options={{
              headerShadowVisible: false,
              headerShown: false,
              // header: () => <GoBack title={undefined} />,
              // headerBackVisible: true,
              navigationBarHidden: true,
            }}
          />

          <Stack.Screen
            name="Pharmacy"
            options={{ header: () => <PharmacyHeader /> }}
          />
          <Stack.Screen name="Laboratory" />
          <Stack.Screen name="(shops)" />
        </Stack>
      </HospitalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
});

export default Layout;
