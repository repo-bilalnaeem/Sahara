import { Link, router, Stack } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
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
              <Pressable style={{marginRight: 10}}>
                <Ionicons
                  name="bag-outline"
                  size={22}
                  color={"#636363"}
                  style={{ marginBottom: 5 }}
                />
              </Pressable>
            </Link>
          ),
        }}

        // options={{
        //     headerTitle:"",
        //   headerLeft: () => (
        //     <TouchableOpacity
        //       onPress={router.back}
        //       style={[ { marginTop: 52, marginLeft: 18 }]}
        //     >
        //       <Ionicons name="close" size={24} color={"#636363"} />
        //     </TouchableOpacity>
        //   ),
        // }}
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
