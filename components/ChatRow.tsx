import { format } from "date-fns";
import { Href, Link, router } from "expo-router";
import React from "react";
import { FC } from "react";
import { View, Text, Image, TouchableHighlight, Pressable } from "react-native";
import AppleStyleSwipeableRow from "./Swipeable";

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({
  id,
  from,
  date,
  img,
  msg,
  read,
  unreadCount,
}) => {
  return (
    <AppleStyleSwipeableRow>
      <Pressable
        onPressIn={() => router.push(`/(drawer)/(tabs)/(chats)/${id}`)}
      >
        <View 
        // underlayColor={"#DCDCE2"}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              paddingLeft: 20,
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: img }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{from}</Text>
              <Text style={{ fontSize: 16, color: "6E6E7E" }}>
                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
              </Text>
            </View>
            <Text
              style={{
                color: "6E6E7E",
                paddingRight: 20,
                alignSelf: "flex-start",
              }}
            >
              {format(date, "MM.dd.yy")}
            </Text>
          </View>
        </View>
      </Pressable>
    </AppleStyleSwipeableRow>
  );
};
export default ChatRow;
