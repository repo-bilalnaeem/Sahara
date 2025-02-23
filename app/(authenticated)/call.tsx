import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Call, User } from "stream-chat";
import { useUser } from "@clerk/clerk-expo";
import {
  CallContent,
  RingingCallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams } from "expo-router";

const CallScreen = () => {
  const calls = useCalls();
  const call = calls[0];


  if (!call) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(drawer)/(tabs)/chats");
    }
    return null;
  }

  return (
    <StreamCall call={call}>
      {/* <CallContent /> */}
      <RingingCallContent />
    </StreamCall>
  );
};

export default CallScreen;
