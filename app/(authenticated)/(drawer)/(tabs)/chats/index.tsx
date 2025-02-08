import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

import chat from "@/assets/data/chats.json";
import ChatRow from "@/components/ChatRow";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const chats = () => {
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          { paddingBottom: 40, backgroundColor: "#fff" },
          Platform.OS === "android" ? { paddingTop: 115 } : null,
        ]}
        data={chat}
        scrollEnabled={true}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item }) => <ChatRow {...item} />}
        initialNumToRender={10}
        scrollEventThrottle={16}
      />
      {/* <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 10,
          bottom: "6%",
          right: "6%",
          // backgroundColor: "#3d74c2",
        }}
        activeOpacity={0.95}
        onPressIn={() => router.back()}
      >
        <LinearGradient
          colors={["#3d547b", "rgb(12, 95, 144)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.0527, 0.9575]}
          style={[
            {
              width: 60,
              height: 60,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Feather name="home" size={20} color={"#fff"} />
        </LinearGradient>
      </TouchableOpacity> */}
    </View>
  );
};

export default chats;

export const defaultStyles = StyleSheet.create({
  block: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DCDCE2",
    marginLeft: 50,
  },
});

//   export default {
//     primary: '#1063FD',
//     muted: '#3A5A92',
//     background: '#EFEEF6',
//     gray: '#6E6E73',
//     lightGray: '#DCDCE2',
//     green: '#4FEE57',
//     lightGreen: '#DBFFCB',
//     red: '#EF0827',
//     yellow: '#FCC70B',
//   };
