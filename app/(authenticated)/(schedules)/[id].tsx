import { useGetDoctorByIdQuery } from "@/slices/apiSlice";
import { useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Divider } from "react-native-elements";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";

interface Doctor {
  firstName: string;
  lastName: string;
  aboutMe: string;
  department: string;
}

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);
const IMG_HEIGHT = hp("75%");

const navigateToChat = async (
  userId: string,
  doctorId: string,
  router: any
) => {
  try {
    // Check if a chat already exists
    const channels = await client.queryChannels({
      type: "messaging",
      members: { $in: [userId, doctorId] },
    });

    // const channel = channels[0];

    let channel;

    if (channels.length > 0) {
      // If a channel exists, use the first one
      channel = channels[0];
    } else {
      // If no channel exists, create a new one
      channel = client.channel("messaging", {
        members: [userId, doctorId],
        created_by_id: userId, // The user creating the channel
      });

      await channel.create();
    }

    // Navigate to the chat
    router.push(`/(authenticated)/(drawer)/(tabs)/chats/${channel.cid}`);
  } catch (error) {
    console.error("Error navigating to chat:", error);
  }
};
const Page = () => {
  const router = useRouter();
  // const { user, isLoaded } = useUser(); // Check if user is loaded
  const user = useSelector((state: RootState) => state.auth.user);
  const doctorId = "bcaeb6a5-26bd-477b-a0f1-5c5384da3cb3";
  const { data, isLoading } = useGetDoctorByIdQuery({ id: doctorId, date: "" });
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  useEffect(() => {
    if (data && data.doctor) {
      setDoctor(data.doctor);
    }
  }, [data]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0}>
      <View style={styles.screen}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[imageAnimatedStyle, styles.profileImage]}>
            <Animated.Image
              source={require("@/assets/images/doctor.jpg")}
              style={[styles.image]}
            />
          </Animated.View>
          <View style={styles.content}>
            <Text style={styles.name}>
              Dr {doctor?.firstName} {doctor?.lastName}
            </Text>
            <Text style={styles.occupation}>{doctor?.department}</Text>
            <Divider />
            <View style={styles.container}>
              <Text
                style={styles.aboutDark}
                // numberOfLines={expanded ? undefined : 3}
                ellipsizeMode="tail"
              >
                {doctor?.aboutMe}
              </Text>
            </View>

            <Pressable
              onPressIn={() => navigateToChat(user!.id, doctorId, router)}
            >
              <LinearGradient
                colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.book_btn]}
              >
                <View style={{ width: "100%" }}>
                  <Text style={styles.book_txt}>Go to Chat</Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </Animated.ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  profileImage: {
    width: wp("100%"),
    height: hp("52%"),
  },

  image: {
    width: wp("100%"),
    height: hp("75%"),
  },

  content: {
    paddingTop: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 13,
    marginBottom: 100,
    height: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  name: {
    fontSize: 20,
    color: "#1E1F22",
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 14,
    marginLeft: 5,
  },

  occupation: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 24,
    marginLeft: 5,
  },

  container: {
    paddingHorizontal: 5,
    marginVertical: 20,
  },

  aboutDark: {
    color: "#454545",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25,
  },

  book_btn: {
    width: "100%",
    height: 55,
    borderRadius: 40,
    alignItems: "center",
    flexDirection: "row",
  },

  book_txt: {
    width: "100%",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Page;
