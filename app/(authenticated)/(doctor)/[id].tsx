import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useGetDoctorByIdQuery } from "@/slices/apiSlice";

interface Slot {
  id: number;
  scheduleId: number;
  date: string;
  time: string;
  isBooked: boolean;
}

interface Schedule {
  id: number;
  doctorId: string;
  day: string;
  slots: Slot[];
}

interface Doctor {
  doctorId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  city: string;
  postalCode: number;
  imageUrl: string;
  department: string;
  experience: number;
  fees: number;
  aboutMe: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  schedules: Schedule[];
}

interface DoctorResponse {
  doctor: Doctor;
}

const Page = () => {
  const { id } = useLocalSearchParams();
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split("T")[0];
  });

  const { data, isLoading } = useGetDoctorByIdQuery({ id, date });
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (data && data.doctor) {
      setDoctor(data.doctor);
    }
  }, [data]);

  // console.log(JSON.stringify(doctor, null, 2));

  const snapPoints = useMemo(() => ["35%", "100%"], []);
  const { top } = useSafeAreaInsets();
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
      <Animated.Image source={{ uri: doctor?.imageUrl }} style={styles.image} />

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
            <Text style={styles.name}>
              Dr {doctor?.firstName} {doctor?.lastName}
            </Text>
            <Text style={styles.occupation}>{doctor?.department}</Text>
            <Divider />
            <View style={styles.container}>
              <Text style={styles.aboutme} ellipsizeMode="tail">
                {doctor?.aboutMe}
              </Text>
            </View>
            <DateTimePicker
              mode="single"
              date={date}
              timePicker={false}
              onChange={(params) => {
                // console.log("Date selected:", params.date);
                if (params.date) {
                  const selectedDate = new Date(params.date as any);
                  selectedDate.setMinutes(
                    selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
                  );
                  setDate(selectedDate.toISOString().split("T")[0]);
                }
              }}
              minDate={new Date(new Date().setHours(0, 0, 0, 0))}
              headerContainerStyle={{
                paddingHorizontal: 5,
                paddingTop: 10,
                overflow: "hidden",
              }}
            />
            {(doctor?.schedules?.length ?? 0) > 0 ? (
              <View>
                <Text style={styles.availableSlots}>Available Slots</Text>

                <FlatList
                  data={
                    doctor?.schedules?.flatMap((schedule) => schedule.slots) ||
                    []
                  }
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.slotContainer}
                  renderItem={({ item, index }) => (
                    <Pressable
                      onPress={() => !item.isBooked && setSelectedSlot(item)}
                      style={[
                        styles.timeBtn,
                        selectedSlot?.id === item.id && styles.selectedTimeBtn,
                        item.isBooked && styles.bookedSlot,
                      ]}
                      disabled={item.isBooked}
                      key={index}
                    >
                      <Text
                        style={[
                          styles.timeText,
                          selectedSlot?.id === item.id &&
                            styles.selectedTimeText,
                          item.isBooked && styles.bookedText,
                        ]}
                      >
                        {new Date(item.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 5,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                No Slots available
              </Text>
            )}

            <LinearGradient
              colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                styles.book_btn,
                (!date || !selectedSlot) && { opacity: 0.75 },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.95}
                disabled={!date || !selectedSlot}
                onPress={() => {
                  console.log("Date selected:", date);
                  console.log("Time slot selected:", selectedSlot);

                  router.navigate({
                    pathname: "/(authenticated)/(booking)",
                    params: {
                      date,
                      timeSlot: selectedSlot?.time,
                    },
                  });
                }}
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

  bookedSlot: {
    backgroundColor: "#D3D3D3",
  },

  bookedText: {
    color: "#808080",
  },
});
export default Page;
