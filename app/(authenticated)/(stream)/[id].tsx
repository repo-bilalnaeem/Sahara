import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import InCallManager from "react-native-incall-manager";

import Spinner from "react-native-loading-spinner-overlay";
import {
  Call,
  CallContent,
  RingingCallContent,
  StreamCall,
  StreamVideoEvent,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";

import CustomCallControls from "@/components/CustomCallControls";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();

  // Join the call
  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      try {
        const newCall = client!.call("default", id);
        await newCall.join({ create: true });

        // Enable proper audio session handling
        InCallManager.start({ media: "video" });
        InCallManager.setKeepScreenOn(true); // Prevent screen from turning off
        InCallManager.setForceSpeakerphoneOn(true); // Route audio to speaker

        setCall(newCall);
      } catch (error) {
        console.error("Error joining call:", error);
      }
    };

    joinCall();

    return () => {
      // Stop InCallManager when component unmounts or call ends
      InCallManager.stop();
    };
  }, [call]);

  // Navigate back home on hangup
  const goToHomeScreen = async () => {
    router.back();
  };

  if (!call) return;

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <CallContent
          onHangupCallHandler={goToHomeScreen}
          layout="grid"
          CallControls={CustomCallControls}
        />
      </StreamCall>
    </View>
  );
};

export default Page;
