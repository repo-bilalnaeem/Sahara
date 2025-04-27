import { User } from "@/app/signin";
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";
import { logout } from "@/slices/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const apiKey = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!;

interface StreamUser {
  id: string;
  name: string;
  imageUrl: string;
}

const VideoProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const streamToken = useSelector((state: RootState) => state.auth.streamToken);
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [triggerGetLoggedUser] = useLazyGetLoggedUserQuery();
  const dispatch = useDispatch<AppDispatch>();

  const [userData, setUserData] = useState<StreamUser | null>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const userData = await triggerGetLoggedUser().unwrap();

        if (!userData.user.Customer) {
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
          router.replace("/signin");
        } else {
          const formattedUser: StreamUser = {
            id: userData?.user?.Customer?.userId,
            name: `${userData?.user?.Customer?.firstName} ${userData?.user?.Customer?.lastName}`,
            imageUrl: userData?.user?.Customer?.imageUrl,
          };
          setUserData(formattedUser);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    checkUserProfile();
  }, [triggerGetLoggedUser]);

  // console.log(userData)

  useEffect(() => {
    if (!user || !userData) return;

    const initVideoClient = async () => {
      try {
        const client = await StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: { id: userData.id, name: userData.name },
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
