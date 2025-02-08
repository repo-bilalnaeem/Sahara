import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <SQLiteProvider databaseName="chats.db" onInit={migrateDbIfNeeded}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Colors.selected },
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(services)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="notification"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(mart)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(doctor)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(schedules)/[id]"
            options={{
              headerTransparent: true,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="messages/[id]"
            options={
              {
                // headerShown: false,
              }
            }
          />

          <Stack.Screen
            name="(booking)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(stream)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SQLiteProvider>
    </Provider>
  );
};

export default Layout;
