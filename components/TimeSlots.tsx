import BookSlider from "./BookSlider";
import React, { useState, useEffect } from "react";
import { useGetDoctorQuery } from "@/slices/apiSlice";
import DateTimePicker from "react-native-ui-datepicker";
import { View, Text, StyleSheet, Pressable } from "react-native";
import dayjs from "dayjs";
interface TimeSlotsProps {
  doctorId: string | string[];
}

const TimeSlots = ({ doctorId }: TimeSlotsProps) => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const { data, error, isLoading } = useGetDoctorQuery(doctorId);
  const [slots, setSlots] = useState<
    { id: number; time: string; isBooked: boolean }[]
  >([]);

  useEffect(() => {
    if (data?.doctor?.Doctor && Array.isArray(data.doctor.Doctor)) {
      const doctorData = data.doctor.Doctor[0]; // Access the first doctor in the array

      if (doctorData.schedules && Array.isArray(doctorData.schedules)) {
        const allSlots = doctorData.schedules
          .flatMap((schedule: any) => schedule.slots) // Combine all slots from all schedules
          .map((slot: any) => ({
            id: slot.id,
            time: slot.time, // Extract time as is or format if needed
            isBooked: slot.isBooked,
          }));

        setSlots(allSlots); // Update the state with all slots
      }
    }
  }, [data]);

  // console.log(slots);

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
            {slots.map((slot) => (
              <Pressable
                key={slot.id}
                onPress={() => setSelectedSlot(slot.id)}
                disabled={slot.isBooked} // Disable button if the slot is booked
                style={[
                  styles.timeBtn,
                  selectedSlot === slot.id && styles.selectedTimeBtn,
                  slot.isBooked && styles.bookedTimeBtn,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedSlot === slot.id && styles.selectedTimeText,
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
      <BookSlider name={"Book Appointment"} />
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
    // width: "100%",
    // paddingHorizontal: 10,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },

  bookedTimeBtn: {
    backgroundColor: "#D3D3D3",
  },

  bookedTimeText: {
    color: "#888",
  },
});

export default TimeSlots;
