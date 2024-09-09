import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";
import BookSlider from "./BookSlider";

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

  const timeSlots = generateTimeSlots(14, 17, 15);

  return (
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
          {timeSlots.map((slot, index) => (
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

      <View style={styles.slider}>
        <BookSlider name={"Book Appointment"} data={undefined} />
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
    borderWidth: StyleSheet.hairlineWidth,
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

  slider: {
    // position: "absolute",
    // bottom: 32,
    width: "100%",
    // paddingHorizontal: 10,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TimeSlots;
