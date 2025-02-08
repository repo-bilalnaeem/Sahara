import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <View
              style={{
                flexDirection: "row",
                paddingTop: 52,
                paddingLeft: 18,
                gap: 18,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={router.back}
                style={[styles.closeButton, {}]}
              >
                <Ionicons name="close" size={24} color={"#000000"} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Booking</Text>
                {/* <Text style={{ fontWeight: "300", fontSize: 13 }}>
                  Doctor Appointment
                </Text> */}
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
