import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

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
      const call = client!.call("default", id);
      await call.join({ create: true });

      setCall(call);
    };

    joinCall();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? "row" : "column",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#fff",
  },

  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Page;
