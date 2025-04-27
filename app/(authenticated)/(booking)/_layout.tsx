import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          gestureEnabled: false,
          header: () => (
            <View
              style={{
                flexDirection: "row",
                paddingTop: top + 10,
                paddingLeft: 16,
                gap: 18,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingBottom: 10,
              }}
            >
              <GoBack />

              <View>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Booking</Text>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    // backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    zIndex: 2,
  },
});

export default Layout;
