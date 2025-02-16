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
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { View, Text, TouchableWithoutFeedback } from "react-native"; // Add View & Text for handling loading

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
        <ChannelList
          filters={{ members: { $in: [user!.id] } }}
          onSelect={(channel) => {
            // console.log("Channel Selected:", channel.id);
            router.push(`/(authenticated)/(drawer)/(tabs)/chats/${channel.cid}`);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Index;
