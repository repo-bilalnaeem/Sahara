import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams();

  console.log("id: ", id);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                width: 220,
                alignItems: "center",
                gap: 10,
                paddingBottom: 4,
              }}
            >
              <Image
                source={{
                  uri: "https://galaxies.dev/img/meerkat_2.jpg",
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Dr Mathew Lewis
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={"#1063FD"} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={() => router.push(`/(authenticated)/(stream)/${id}`)}
              >
                <Ionicons name="call-outline" color={"#1063FD"} size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#EFEEF6",
          },
        }}
      />
 
    </SafeAreaView>
  );
};

export default Page;
