import React from "react";
import { Stack } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
              }}
            >
              <TouchableOpacity
                onPress={router.back}
                style={[styles.closeButton, {}]}
              >
                <Ionicons name="close" size={24} color={"#000000"} />
              </TouchableOpacity>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>Cart</Text>
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
