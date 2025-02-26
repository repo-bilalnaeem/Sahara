import React from "react";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native"; // Add View & Text for handling loading
import { useSelector } from "react-redux";

const Index = () => {
  // const { user, isLoaded } = useUser(); // Check if user is loaded
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  // if (!isLoaded) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          backgroundColor:"#fff"
        }}
      >
        {/* <Stack.Screen
          options={{
            headerRight: () => (
              <Link href={"/(drawer)/(tabs)/chats/users"} asChild>
                <FontAwesome5
                  name="users"
                  size={22}
                  color="gray"
                  style={{ marginHorizontal: 16 }}
                />
              </Link>
            ),
          }}
        /> */}

        <ChannelList
          filters={{ members: { $in: [user!.id] } }}
          onSelect={(channel) => {
            // console.log("Channel Selected:", channel.id);
            router.push(
              `/(authenticated)/(drawer)/(tabs)/chats/${channel.cid}`
            );
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Index;
