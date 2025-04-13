import { Link, router, Stack } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/store/cartStore";

const Layout = () => {
  const items = useCart((state) => state.items);

  const hasItems = items.length > 0;

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerShadowVisible: false,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={"#636363"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/(cart)"} asChild>
              <Pressable style={{ marginRight: 10 }}>
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
