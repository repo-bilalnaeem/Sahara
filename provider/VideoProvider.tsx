import { User } from "@/app/signin";
import { RootState } from "@/store/store";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const VideoProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const streamToken = useSelector((state: RootState) => state.auth.streamToken);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedData = await SecureStore.getItemAsync("user_data");
        if (!storedData) return;
        // console.log(storedData);
        const parsedUser = JSON.parse(storedData);
        // console.log("parsed:", parsedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error(error);
      }
    };
    initializeUser();
  }, []);

  // console.log(userData)

  useEffect(() => {
    if (!user) return;

    const initVideoClient = async () => {
      try {
        const client = await StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: { id: user.id, name: userData?.name },
          token: streamToken!, // Use a real token in production
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
  }, [user, userData]);

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
