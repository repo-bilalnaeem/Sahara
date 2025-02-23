import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Divider } from "react-native-elements";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "react-native-ui-datepicker";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const generateTimeSlots = (
  startHour: number,
  endHour: number,
  interval: number
) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
};

const Page = () => {
  const { id } = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const snapPoints = useMemo(() => ["35%", "100%"], []);
  const { top } = useSafeAreaInsets();
  const timeSlots = generateTimeSlots(14, 15, 30);
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          top,
          left: 16,
        }}
      ></View>
      <Animated.Image
        source={require("@/assets/images/doctor.jpg")}
        style={styles.image}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ width: 5, backgroundColor: "#fff" }}
        backgroundStyle={{
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        }}
        containerStyle={{
          marginTop: top * 2.5,
        }}
      >
        <BottomSheetScrollView
          bounces={false}
          contentContainerStyle={{}}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.name}>Dr Mathew Lewis</Text>
            <Text style={styles.occupation}>Heart Specialist</Text>
            <Divider />
            <View style={styles.container}>
              <Text style={styles.aboutme} ellipsizeMode="tail">
                Welcome to my profile! I am Dr. Mathew Lewis, a highly
                experienced and board-certified Cardiologist dedicated to
                providing exceptional cardiovascular care. With over 15 years of
                clinical experience, I am passionate about ensuring the heart
                health and well-being of my patients.
              </Text>
            </View>
            <DateTimePicker
              mode="single"
              date={date}
              timePicker={false}
              onChange={(params) => {
                // console.log("Date selected:", params.date);
                if (params.date) {
                  setDate(params.date);
                }
              }}
              minDate={new Date(new Date().setHours(0, 0, 0, 0))} // Ensure today is selectable
              headerContainerStyle={{
                paddingHorizontal: 5,
                paddingTop: 10,
                overflow: "hidden",
              }}
            />
            <Text style={styles.availableSlots}>Available Slots</Text>

            <FlatList
              data={timeSlots}
              keyExtractor={(item, index) => index.toString()}
              bounces={false}
              horizontal // ✅ Enables horizontal scrolling
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.slotContainer}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedSlot(item)}
                  style={[
                    styles.timeBtn,
                    selectedSlot === item && styles.selectedTimeBtn,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedSlot === item && styles.selectedTimeText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <LinearGradient
              colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.book_btn]}
            >
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => router.navigate("/(authenticated)/(booking)")}
                style={{ width: "100%" }}
              >
                <Text style={styles.book_txt}>Book Appointment</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp("100%"),
    height: hp("75%"),
  },

  content: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 13,
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

  aboutme: {
    color: "#454545",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25,
  },

  availableSlots: {
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 24,
    marginLeft: 5,
  },

  timeBtn: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  slotContainer: {
    gap: 6,
    paddingHorizontal: 4,
  },

  selectedTimeBtn: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },

  timeText: {
    fontWeight: "500",
  },

  selectedTimeText: {
    color: "#FFF",
  },

  book_btn: {
    width: "100%",
    height: 55,
    borderRadius: 40,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 32,
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
