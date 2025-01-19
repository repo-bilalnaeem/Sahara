import TimeSlots from "@/components/TimeSlots";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  useColorScheme,
  FlatList,
} from "react-native";
import { Divider, SegmentedButtons } from "react-native-paper";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 380;

const reviewsData = [
  {
    id: "1",
    name: "Hannah Baker",
    review:
      "Dr. Lewis is an outstanding cardiologist! His expertise and compassion are truly remarkable. He took the time to thoroughly explain my condition and treatment options, putting my mind at ease. I highly recommend him to anyone seeking top-notch cardiac care.",
    image: require("@/assets/images/profile_img.jpg"),
  },
  {
    id: "2",
    name: "John Doe",
    review:
      "Great experience with Dr. Lewis. He is very knowledgeable and caring.",
    image: require("@/assets/images/profile_img.jpg"),
  },
  // Add more reviews as needed
];

const Reviews = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.notificationBlock}>
      <View style={styles.image_name}>
        <Image source={item.image} style={styles.profile_img} />
        <Text style={styles.review_name}>{item.name}</Text>
      </View>
      <Text style={styles.review_text} numberOfLines={3} ellipsizeMode="tail">
        {item.review}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={reviewsData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 16, paddingTop: 24 }}
    />
  );
};

const Slots = () => {
  return <TimeSlots />;
};

const Page = () => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("slots");
  const snapPoints = useMemo(() => ["40%", "55%", "75%"], []);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0}>
      <View style={styles.screen}>
        <View style={[styles.profileImage]}>
          <Animated.Image
            source={require("@/assets/images/doctor.jpg")}
            style={[styles.image]}
          />
        </View>

        <BottomSheet
          snapPoints={snapPoints}
          // enableContentPanningGesture={false}
          handleIndicatorStyle={{ width: 5, backgroundColor: "#fff" }}
          backgroundStyle={{
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
          }}
          maxDynamicContentSize={500}
        >
          <BottomSheetScrollView
            bounces={false}
            contentContainerStyle={{
              marginBottom: 48,
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled
          >
            <View style={styles.content}>
              <Text style={styles.name}>Dr Mathew Lewis</Text>
              <Text style={styles.occupation}>Heart Specialist</Text>
              <Divider />

              <View style={styles.container}>
                <Text
                  style={styles.aboutDark}
                  numberOfLines={expanded ? undefined : 3}
                  ellipsizeMode="tail"
                >
                  Welcome to my profile! I am Dr. Mathew Lewis, a highly
                  experienced and board-certified Cardiologist dedicated to
                  providing exceptional cardiovascular care. With over 15 years
                  of clinical experience, I am passionate about ensuring the
                  heart health and well-being of my patients.
                  {expanded && (
                    <TouchableOpacity onPress={toggleExpansion}>
                      <Text style={styles.viewMore}>View Less</Text>
                    </TouchableOpacity>
                  )}
                </Text>
                {!expanded && (
                  <TouchableOpacity onPress={toggleExpansion}>
                    <Text style={styles.viewMore}>View More</Text>
                  </TouchableOpacity>
                )}
              </View>

              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: "slots",
                    label: "Slot",
                  },
                  {
                    value: "review",
                    label: "Review",
                  },
                  {
                    value: "rating",
                    label: "Rating",
                  },
                ]}
              />

              {value === "review" && <Reviews />}
              {value === "slots" && <Slots />}
            </View>
          </BottomSheetScrollView>
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
    // paddingTop: 20,
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 13,
    marginBottom: 30,
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
    bottom: Platform.OS === "android" ? 0 : 25,
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

  notificationBlock: {
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#aaaaaa",
  },

  image_name: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
    marginLeft: -5,
  },

  review_text: {
    // color: "#fff",
    lineHeight: 22,
  },

  profile_img: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },

  review_name: {
    // color: "#fff",
    // font-family: Lato;
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 137.5% */,
  },
});

export default Page;
