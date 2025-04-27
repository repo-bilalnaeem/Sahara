import GoBack from "@/components/GoBack";
import { Slot, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { StreamChat, User } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const client = StreamChat.getInstance(STREAM_KEY!);

const Layout = () => {
  // const { user, isLoaded } = useUser();
  // useEffect(() => {
  //   const connect = async () => {
  //     await client.connectUser(
  //       {
  //         id: user!.id,
  //         name: "Sahara Demo User",
  //         image: "https://getstream.io/random_svg/?name=John",
  //       },
  //       client.devToken(user!.id)
  //     );
  //   };

  //   connect();

  //   return () => {
  //     client.disconnectUser();
  //   };
  // });
  const router = useRouter();
  return (
    <OverlayProvider>
      {/* <Chat client={client}> */}
      <Stack
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Messages",
            headerLeft: () => <GoBack />,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="[cid]"
          options={{
            title: "channel",
            headerBackButtonDisplayMode: "minimal",
            headerLeft: () => (
              <TouchableOpacity
                onPressIn={() =>
                  router.dismissTo("/(authenticated)/(drawer)/(tabs)/chats")
                }
                style={[styles.darkBackButton]}
              >
                <Image
                  style={[
                    { width: wp("4%") },
                    { height: hp("4%") },
                    { tintColor: "#fff", objectFit: "contain" },
                  ]}
                  source={require("@/assets/images/arrow.png")}
                />
              </TouchableOpacity>
            ),

            //   headerShown: false,
          }}
        />
      </Stack>
      {/* </Chat> */}
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({
  darkBackButton: {
    borderRadius: 24,
    width: wp("9%"),
    height: hp("4%"),
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },
});

export default Layout;
