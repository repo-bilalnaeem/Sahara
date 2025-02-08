import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const Layout = () => {
  const [client, setClient] = useState<StreamVideoClient>();
  useEffect(() => {
    const setupClient = async () => {
      try {
        const streamUser: User = {
          id: "9a1b0bf5-6cac-4ea6-a0fb-bf139df9a2cf",
        };

        const newClient = new StreamVideoClient({
          apiKey: STREAM_KEY!,
          user: streamUser,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWExYjBiZjUtNmNhYy00ZWE2LWEwZmItYmYxMzlkZjlhMmNmIn0.5qs-Hv5j8DEw1XCNb1JSvy9rQKWj7Z3xjXjwjY1MPBA",
        });

        setClient(newClient);
        console.log("StreamVideoClient initialized:", streamUser);
      } catch (error) {
        // console.error("Error creating StreamVideo client:", error);
      }
    };

    setupClient();

    return () => {
      client?.disconnectUser(); // Cleanup on unmount
      setClient(undefined);
    };
  }, []);

  return (
    client && (
      <StreamVideo client={client}>
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
                options={
                  {
                    headerShown: false,
                  }
                }
              />
            </Stack>
          </SQLiteProvider>
        </Provider>
      </StreamVideo>
    )
  );
};

export default Layout;
