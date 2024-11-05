import { View, ScrollView, FlatList, StyleSheet, Platform } from "react-native";
import React from "react";

import chat from "@/assets/data/chats.json";
import ChatRow from "@/components/ChatRow";

const chats = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        { paddingBottom: 40, backgroundColor: "#fff" },
        Platform.OS === "android" ? { paddingTop: "30%" } : null,
      ]}
    >
      <FlatList
        data={chat}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item }) => <ChatRow {...item} />}
      />
    </ScrollView>
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
