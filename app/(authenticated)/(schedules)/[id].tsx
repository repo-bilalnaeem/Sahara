import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import {
  Href,
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 420;

const Page = () => {
  const { id } = useLocalSearchParams();
  const isDarkMode = useColorScheme() === "dark";

  const router = useRouter();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [expanded, setExpanded] = useState(false);
  const [meetingId, setMeetingId] = useState<string | null>(null);

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

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const [isTimeToJoinCall, setIsTimeToJoinCall] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      if (currentHours >= 0 && currentMinutes >= 0) {
        setIsTimeToJoinCall(true);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Inside your component
  const onJoinCall = () => {
    // const randomId = Math.floor(Math.random() * 1000).toString();
    // Explicitly cast the route to `Href` type
    bottomSheetRef.current?.close();
    setMeetingId(null);
    router.push(
      `/(authenticated)/(schedules)/(stream)/${meetingId}` as Href<`/(authenticated)/(schedules)/(stream)/${string}`>
    );
  };

  const snapPoints = useMemo(() => ["20%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleJoinPress = () => {
    // Expand the bottom sheet
    bottomSheetRef.current?.expand();

    // Automatically focus the TextInput
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 300); // Delay to ensure the bottom sheet is expanded before focusing
  };

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
            <Text style={styles.name}>Dr Mathew Lewis</Text>
            <Text style={styles.occupation}>Heart Specialist</Text>

            <View style={styles.container}>
              <Text
                style={styles.aboutDark}
                numberOfLines={expanded ? undefined : 3}
                ellipsizeMode="tail"
              >
                Welcome to my profile! I am Dr. Mathew Lewis, a highly
                experienced and board-certified Cardiologist dedicated to
                providing exceptional cardiovascular care. With over 15 years of
                clinical experience, I am passionate about ensuring the heart
                health and well-being of my patients.
              </Text>
              <TouchableOpacity onPress={toggleExpansion}>
                <Text style={styles.viewMore}>
                  {expanded ? "View less" : "View more"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.ScrollView>
        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              // isTimeToJoinCall ? onJoinCall : () => router.push(`/_sitemap`)
              handleOpenPress
            }
          >
            <LinearGradient
              colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.cancel_btn]}
            >
              <View style={{ width: "100%" }}>
                <Text style={styles.cancel_txt}>
                  {isTimeToJoinCall ? "Join Call" : "Cancel Appointment"}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* <Pressable style={styles.message_btn}>
          <View>
            <Image
              source={require("@/assets/images/chat-msg.png")}
              style={{ width: 26, height: 26 }}
            />
          </View>
        </Pressable> */}
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          handleIndicatorStyle={{ backgroundColor: "#fff" }}
          backdropComponent={renderBackdrop}
        >
          {/* <TextInput placeholder="Enter Meeting ID" /> */}
          <TextInput
            placeholder="Enter Meeting ID"
            style={styles.input}
            keyboardType="numeric"
            enablesReturnKeyAutomatically
            ref={textInputRef}
            onSubmitEditing={onJoinCall}
          />
        </BottomSheet>
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
    height: IMG_HEIGHT,
    width,
  },

  image: {
    width,
    height: 580,
  },

  content: {
    paddingTop: 20,
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 13,
    marginBottom: 100,
  },

  name: {
    fontSize: 24,
    color: "#1E1F22",
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 14,
    marginLeft: 5,
  },

  occupation: {
    fontSize: 15,
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

  viewMore: {
    color: "#478EEF",
  },

  actions: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  cancel_btn: {
    width: "100%",
    height: 66,
    borderRadius: 40,
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancel_txt: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato400",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
    marginHorizontal: 4,
  },

  message_btn: {
    width: 66,
    height: 66,
    borderRadius: 100,
    borderBlockColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 10,
    shadowOpacity: 1,
  },

  input: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    color: "#000",
  },
});

export default Page;
