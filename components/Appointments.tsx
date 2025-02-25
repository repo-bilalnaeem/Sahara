import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { useGetAllAppointmentsQuery } from "@/slices/apiSlice";
import { Stack, useNavigation, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Appointments = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});
  const navigation = useNavigation();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );

  if (!data || data.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No appointments found.</Text>
      </View>
    );

  // Get today's date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 🛠 Grouping function: Groups appointments by 'slot.date'
  const groupAppointmentsBySlotDate = (appointments: any) => {
    return appointments.reduce((acc: any, appointment: any) => {
      const slotDate = new Date(appointment.slot.date);
      slotDate.setHours(0, 0, 0, 0); // Normalize to ignore time

      const formattedDate =
        slotDate.getTime() === today.getTime()
          ? "Upcoming"
          : slotDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(appointment);
      return acc;
    }, {});
  };

  // Get grouped appointments
  const groupedAppointments = groupAppointmentsBySlotDate(data);
  const groupedEntries = Object.entries(groupedAppointments);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={groupedEntries}
        bounces={false}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, appointments] }) => (
          <View>
            {/* 📅 Date Heading */}
            <Text style={{ fontWeight: "500", fontSize: 14, marginBottom: 24 }}>
              {date}
            </Text>

            {/* 🔽 Render Appointments under the Date */}
            {appointments.map((appointment: any) => (
              <Pressable
                key={appointment.id}
                onPress={() =>
                  router.push(
                    `/(authenticated)/(schedules)/${appointment.doctorId}`
                  )
                }
              >
                <View
                  style={{
                    backgroundColor: "#f3f2f2",
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  <View style={styles.flex_items}>
                    <View style={styles.img_container}>
                      <Image
                        source={{ uri: appointment.doctor.imageUrl }}
                        style={styles.doctor_img}
                      />
                    </View>
                    <View
                      style={{
                        flexGrow: 1,
                        // marginTop: 8,
                      }}
                    >
                      <Text style={styles.doctor_name}>
                        Dr. {appointment.doctor.firstName}{" "}
                        {appointment.doctor.lastName}
                      </Text>
                      <Text style={styles.occupation}>
                        {appointment.doctor.department}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 24,
                          marginTop: 6,
                        }}
                      >
                        <Text style={[styles.time]}>
                          {/* {new Date(appointment.slot.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                          ,{" "} */}
                          {new Date(appointment.slot.time).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </Text>
                        <Text
                          style={[
                            styles.time,
                            { textAlign: "right", alignSelf: "baseline" },
                          ]}
                        >
                          Rs. {appointment.doctor.fees}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        contentContainerStyle={{
          marginHorizontal: 10,
          marginTop: top / 1.5,
          gap: 20,
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  doctor_img: {
    width: wp("30%"),
    height: hp("18%"),
    borderRadius: 6,
    objectFit: "cover",
  },

  img_container: {
    borderRadius: 6,
    width: wp("30%"),
    height: hp("13%"),
    overflow: "hidden",
  },

  doctor_name: {
    // color: "#FFF",
    color: "#333",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 157.143% */,
  },

  occupation: {
    color: "#333",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.72,
  },

  flex_items: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },


  time: {
    color: "#333",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22.2,
    // textAlign: "center",
  },
});

export default Appointments;
