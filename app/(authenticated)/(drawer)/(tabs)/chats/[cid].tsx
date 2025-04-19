import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import * as Crypto from "expo-crypto";

const ChannelId = () => {
  const [channel, SetChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  // console.log(cid);
  const router = useRouter();
  const { client } = useChatContext();
  const videoClient = useStreamVideoClient();
  const [otherMemberName, setOtherMemberName] = useState<string>("");

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      SetChannel(channels[0]);

      if (channels[0]) {
        const members = Object.values(channels[0].state.members);
        // Assuming there's only one other member in the conversation
        const otherMember = members.find(
          (member) => member.user_id !== client.user?.id
        );
        if (otherMember) {
          setOtherMemberName(otherMember.user?.name || "Unknown User");
        }
      }
    };
    fetchChannel();
  }, [cid]);

  // console.log("Other memeber:",otherMemberName)

  const joinCall = async () => {
    if (!videoClient) {
      console.error("Video client is not initialized yet.");
      return;
    }

    if (!channel) {
      console.error("Channel is not available.");
      return;
    }
    // console.log(JSON.stringify(channel?.state.members, null, 2));

    const members = Object.values(channel.state.members)
      .map((member) => ({
        user_id: member.user_id ?? "",
      }))
      .filter((member) => member.user_id !== "");

    // console.log(members);

    // create a call using the channel members
    const call = videoClient.call("default", Crypto.randomUUID());
    await call.getOrCreate({
      ring: true,
      data: {
        members,
      },
    });
  };

  if (!channel) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <Channel channel={channel}>
      <Stack.Screen
        options={{
          title: otherMemberName || "Channel",
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 20, height: 20 }}
              onPressIn={joinCall}
            >
              <Ionicons name="call" size={20} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      <MessageList />
      <SafeAreaView
        edges={["bottom"]}
        style={{ paddingBottom: 16, backgroundColor: "#fff" }}
      >
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
};

export default ChannelId;
