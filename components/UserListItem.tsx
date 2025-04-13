import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useRouter } from "expo-router";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const router = useRouter();
  const { user: me } = useUser();
  const onPress = async () => {
    try {
      console.log("User ID: ", me.id);
      console.log("Doctor ID: ", user.doctorId);
      const channel = client.channel("messaging", {
        members: [me.id, user.doctorId],
      });

      // console.log("Channel ID is:", channel.cid);

      await channel.create();
      router.replace(`/(drawer)/(tabs)/chats/${channel.cid}`);
    } catch (error) {
      Alert.alert("Something went wrong!");
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontWeight: "600" }}>
        {user.firstName} {user.lastName}
      </Text>
    </Pressable>
  );
};

export default UserListItem;
