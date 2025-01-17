import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { useGetDoctorQuery } from "@/slices/apiSlice";
import dayjs from "dayjs";
import BookSlider from "./BookSlider";

interface TimeSlotsProps {
  doctorId: string | string[];
}

const TimeSlots = ({ doctorId }: TimeSlotsProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null); // Store the time instead of id
  const { data, error, isLoading } = useGetDoctorQuery(doctorId);
  const [slots, setSlots] = useState<
    { id: number; time: string; isBooked: boolean }[]
  >([]);
  const [fees, setFees] = useState<number | null>(null);

  useEffect(() => {
    if (data?.doctor?.Doctor?.schedules) {
      setFees(data?.doctor?.Doctor?.fees);

      const filteredSchedule = data.doctor.Doctor.schedules.find(
        (schedule: any) =>
          dayjs(schedule.date).isSame(dayjs(selectedDate), "day")
      );

      // Extract slots from the filtered schedule
      if (filteredSchedule?.slots) {
        const allSlots = filteredSchedule.slots.map((slot: any) => ({
          id: slot.id,
          time: slot.time,
          isBooked: slot.isBooked,
        }));

        setSlots(allSlots); // Update the state with the slots for the selected date
      } else {
        setSlots([]); // No slots for the selected date
      }
    }
  }, [data, selectedDate]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading slots!</Text>;
  }

  return (
    <View>
      <View style={{ marginVertical: 24 }}>
        <View style={styles.container}>
          <DateTimePicker
            mode="single"
            date={selectedDate}
            onChange={(event) => {
              if (event?.date) {
                setSelectedDate(event.date); // Update the selected date state
              }
            }}
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
            {slots.map((slot) => (
              <Pressable
                key={slot.id}
                onPress={() => setSelectedSlot(slot.time)} // Set the time instead of the ID
                disabled={slot.isBooked}
                style={[
                  styles.timeBtn,
                  selectedSlot === slot.time && styles.selectedTimeBtn, // Compare time instead of ID
                  slot.isBooked && styles.bookedTimeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedSlot === slot.time && styles.selectedTimeText,
                    slot.isBooked && styles.bookedTimeText,
                  ]}
                >
                  {new Date(slot.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <BookSlider
        name={"Book Appointment"}
        doctorId={doctorId}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot} // Pass the time slot to BookSlider
        fees={fees}
      />
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
  bookedTimeBtn: {
    backgroundColor: "#D3D3D3",
  },
  bookedTimeText: {
    color: "#888",
  },
});

export default TimeSlots;
