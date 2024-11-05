import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GoBack from "@/components/GoBack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "stream-chat-expo";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: "#fff",
          },

          headerTitleStyle: { fontSize: 16, fontWeight: "500" },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerLeft: () => (
            <View style={{ marginRight: 13 + 15 }}>
              <GoBack title={undefined} />
            </View>
          ),
        }}
      />
       <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 220,
                alignItems: 'center',
                gap: 10,
                paddingBottom: 4,
              }}>
              <Image
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Simon Grimm</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={'#1063FD'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" color={'#1063FD'} size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#EFEEF6',
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
