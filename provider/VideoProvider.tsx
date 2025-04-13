import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const VideoProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const streamToken = useSelector((state: RootState) => state.auth.streamToken);
  // console.log("user:",user);
  // console.log("token:",streamToken);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  useEffect(() => {
    if (!user) return;

    const initVideoClient = async () => {
      try {
        const client = new StreamVideoClient({
          apiKey,
          user: { id: user.id, name: "Bilal Naeem" },
          token: streamToken, // Use a real token in production
        });

        setVideoClient(client);
      } catch (error) {
        console.error("Error initializing video client:", error);
      }
    };

    initVideoClient();

    return () => {
      videoClient?.disconnectUser(); // Cleanup on unmount
    };
  }, [user]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default VideoProvider;
