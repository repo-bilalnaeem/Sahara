import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import * as SecureStore from "expo-secure-store";
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";
import { AppDispatch } from "@/store/store";
import { logout } from "@/slices/authSlice";
import { router } from "expo-router";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

interface StreamUser {
  id: string;
  name: string;
  imageUrl: string;
}

const ChatProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isReady, setIsReady] = useState(false);

  const [userData, setUserData] = useState<StreamUser | null>(null);
  const [triggerGetLoggedUser] = useLazyGetLoggedUserQuery();
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (!userData || !user) {
      return;
    }
    // console.log(user.id);

    const connect = async () => {
      await client.connectUser(
        {
          id: userData!.id,
          name: userData?.name,
          image: userData?.imageUrl,
          // image: "https://galaxies.dev/img/meerkat_2.jpg",
        },
        client.devToken(userData!.id)
      );
      setIsReady(true);
    };
    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [userData, user]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
