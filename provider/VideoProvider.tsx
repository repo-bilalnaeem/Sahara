import { useUser } from "@clerk/clerk-expo";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const VideoProvider = ({ children }: PropsWithChildren) => {
  console.warn("Video Provider");
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const initVideoClient = async () => {
      try {
        const client = new StreamVideoClient({
          apiKey,
          user: { id: user.id, name: user.fullName || "Unknown User" },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yc2lESzI5N0VoZFRxaU1sZzhNZ3FDVjhMRlQifQ.-Ggl8KX4x1aiEcrFbbyZc7x90a6ofd16Kds1huonGh8' // Use a real token in production
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
  }, [isLoaded, user]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default VideoProvider;
