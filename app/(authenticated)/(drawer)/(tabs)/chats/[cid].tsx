import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Channel as ChannelType } from "stream-chat";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const ChannelId = () => {
  const [channel, SetChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      SetChannel(channels[0]);
    };
    fetchChannel();
    // console.log(cid);
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <SafeAreaView edges={["bottom"]}>
        <MessageInput />
      </SafeAreaView>
    </Channel>
  );
};

export default ChannelId;
