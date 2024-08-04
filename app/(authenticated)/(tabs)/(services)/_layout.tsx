import React from "react";
import { Stack } from "expo-router";
import GoBack from "@/components/GoBack";
import HospitalProvider from "@/providers/HospitalProvider";

const Layout = () => {
  return (
    <HospitalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen
          name="Emergency"
          options={{
            header: () => <GoBack title={undefined} />,
            headerBackVisible: true,
          }}
        />
        <Stack.Screen name="Consultation" />
        <Stack.Screen name="Pharmacy" />
        <Stack.Screen name="Laboratory" />
      </Stack>
    </HospitalProvider>
  );
};

export default Layout;
