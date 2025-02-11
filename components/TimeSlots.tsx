import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";
import BookSlider from "./BookSlider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

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

const TimeSlots = () => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = generateTimeSlots(14, 15, 30);

  return (
    <View>
      <View style={{ marginVertical: 24 }}>
        <View style={styles.container}>
          <DateTimePicker
            mode="single"
            date={date}
            timePicker={false}
            headerContainerStyle={{
              paddingHorizontal: 5,
              paddingTop: 10,
              overflow: "hidden",
            }}
          />
        </View>
        <View>
          <Text style={styles.slotsHeading}>Available Slots</Text>

          <View style={styles.slotsContainer}>
            {timeSlots.map((slot: any, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedSlot(slot)}
                style={[
                  styles.timeBtn,
                  selectedSlot === slot && styles.selectedTimeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedSlot === slot && styles.selectedTimeText,
                  ]}
                >
                  {slot}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.actions}
          activeOpacity={0.8}
          onPressIn={() => router.navigate("/(authenticated)/(booking)")}
        >
          <LinearGradient
            colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.cancel_btn]}
          >
            <View style={{ width: "100%" }}>
              <Text style={styles.cancel_txt}>Book Appointment</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    overflow: "hidden",
    borderRadius: 24,
    marginBottom: 24,
  },

  slotsHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 14,
    marginBottom: 24,
  },

  timeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    flexGrow: 0,
    flexShrink: 1,
    flex: 0,
  },

  slotsContainer: {
    flexDirection: "row",
    // gap: 10,
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    paddingHorizontal: 8,
    marginBottom: 20
  },

  selectedTimeBtn: {
    backgroundColor: "#007BFF",
    borderWidth: 0,
  },

  timeText: {
    fontWeight: "500",
  },

  selectedTimeText: {
    color: "#FFF",
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

  cancel_btn: {
    width: "100%",
    height: 66,
    borderRadius: 40,
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actions: {
    // marginTop: ,
  },
});

export default TimeSlots;
