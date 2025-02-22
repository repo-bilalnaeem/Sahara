// import React from "react";
// import { ChannelList } from "stream-chat-expo";
// import { router } from "expo-router";
// import { useUser } from "@clerk/clerk-expo";

// const index = () => {
//   const { user } = useUser();

//   return (
//     <ChannelList
//       filters={{ members: { $in: [user!.id] } }}
//       onSelect={(channel) => {
//         console.log('Hello')
//         router.push(`/_sitemap`);
//       }}
//     />
//   );
// };

// export default index;
import React from "react";
import { ChannelList } from "stream-chat-expo";
import { Link, Redirect, router, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { View, Text, TouchableWithoutFeedback } from "react-native"; // Add View & Text for handling loading
import { FontAwesome5 } from "@expo/vector-icons";

const Index = () => {
  const { user, isLoaded } = useUser(); // Check if user is loaded

  if (!isLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <Redirect href={"/(drawer)/(tabs)/chats/call"} /> */}
        {/* <Link href={"/(drawer)/(tabs)/chats/call/123"}>Go to call screen</Link> */}
        <Stack.Screen
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
        />
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
