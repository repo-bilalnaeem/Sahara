import { View, Text } from "react-native";
import React from "react";
import { useGetAllAppointmentsQuery } from "@/slices/apiSlice";

const Appointments = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});

  console.log(data);

  return (
    <View>
      <Text>Appointments</Text>
    </View>
  );
};

export default Appointments;
