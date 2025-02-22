import { useCalls } from "@stream-io/video-react-native-sdk";
import { router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CallProvider = ({ children }: PropsWithChildren) => {
  console.warn("Call Provider");
  const calls = useCalls();
  const call = calls[0];
  const { top } = useSafeAreaInsets();
  const segments = useSegments();
  console.log(segments);
  const isOnCallScreen = segments[1] === "call";

  useEffect(() => {
    if (!call) {
      return;
    }
    console.log(
      call.state.callingState && call.state.callingState === "ringing"
    );
    if (!isOnCallScreen) {
      router.push(`/(authenticated)/call`);
    }

    // console.warn("There is an incoming cacll with id:", call.id);
  }, [call, isOnCallScreen]);

  return (
    <>
      {children}
      {call && !isOnCallScreen && (
        <Pressable
          style={{
            position: "absolute",
            backgroundColor: "lightgreen",
            top: 40 + top,
            left: 0,
            right: 0,
            padding: 10,
          }}
          onPress={() => router.push(`/(authenticated)/call`)}
        >
          <Text>
            Call: {call?.id} ({call.state.callingState})
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default CallProvider;
