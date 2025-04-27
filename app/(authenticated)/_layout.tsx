import Colors from "@/constants/Colors";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
// import { Provider } from "react-redux";

import GoBack from "@/components/GoBack";
import { StripeProvider } from "@stripe/stripe-react-native";
import VideoProvider from "@/provider/VideoProvider";
import CallProvider from "@/provider/CallProvider";
import ChatProvider from "@/provider/ChatProvider";
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";
import { Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
import { logout } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { StreamChat } from "stream-chat";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const Layout = () => {
  const [triggerGetLoggedUser] = useLazyGetLoggedUserQuery();
  const [customer, setCustomer] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const userData = await triggerGetLoggedUser().unwrap();
        // console.log("Fetched user data:", userData.user);

        // Check if the customer profile is set up
        if (!userData.user.Customer) {
          setCustomer(false);
        } else {
          setCustomer(true);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Alert.alert("Something went wrong!");
      }
    };

    checkUserProfile();
  }, [router, triggerGetLoggedUser]);

  if (customer) {
    return (
      <ChatProvider>
        <VideoProvider>
          <CallProvider>
            <StripeProvider publishableKey={STRIPE_KEY!}>
              <SQLiteProvider
                databaseName="chats.db"
                onInit={migrateDbIfNeeded}
              >
                <Stack
                  screenOptions={{
                    contentStyle: { backgroundColor: Colors.selected },
                    gestureEnabled: false,
                  }}
                >
                  <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(services)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="notification"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(mart)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(doctor)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(schedules)/[id]"
                    options={{
                      headerTransparent: true,
                      headerTitle: "",
                      headerLeft: () => <GoBack />,
                    }}
                  />
                  <Stack.Screen
                    name="(booking)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="success"
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
                    }}
                  />
                  <Stack.Screen
                    name="call"
                    options={{
                      title: "",
                      headerTransparent: true,
                      headerLeft: () => <GoBack />,
                    }}
                  />
                  <Stack.Screen
                    name="searching"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack>
              </SQLiteProvider>
            </StripeProvider>
          </CallProvider>
        </VideoProvider>
      </ChatProvider>
    );
  }

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await client.disconnectUser();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState()); // ✅ fixed this

      router.replace("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="userProfile"
        options={{
          headerTransparent: true,
          headerTitle: "Setup User Profile",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                marginRight: 5,
              }}
              onPress={() => handleLogout()}
            >
              <Feather name="log-out" size={24} color="#a1a1a1" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
