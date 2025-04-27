import { Link, router, Stack } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/store/cartStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const items = useCart((state) => state.items);

  const hasItems = items.length > 0;
  const { top } = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackButtonMenuEnabled: false,

          header: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "space-between",
                top: top * 1.25,
                paddingHorizontal: 14,
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close" size={24} color={"#636363"} />
              </TouchableOpacity>
              <Link href={"/(cart)"} asChild>
                <Pressable style={{ marginRight: 10, width: 24, height: 30 }}>
                  <View>
                    <Ionicons
                      name="bag-outline"
                      size={22}
                      color={"#636363"}
                      style={{ marginBottom: 5 }}
                    />
                    {hasItems && (
                      <View
                        style={{
                          position: "absolute",
                          top: 4,
                          right: -1,
                          width: 6,
                          height: 6,
                          borderRadius: 5,
                          backgroundColor: "red",
                        }}
                      />
                    )}
                  </View>
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="(cart)"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          animationDuration: 350,
        }}
      />
    </Stack>
  );
};

export default Layout;
