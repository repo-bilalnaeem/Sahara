import { User } from "@/app/signin";
import { apiSlice } from "@/slices/apiSlice";
import { logout } from "@/slices/authSlice";
import { AntDesign } from "@expo/vector-icons";
import {
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Keyboard, View, TouchableOpacity, Image, Text } from "react-native";
import { Divider } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { StreamChat } from "stream-chat";
import * as SecureStore from "expo-secure-store";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const DrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === "open";
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

  useEffect(() => {
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedData = await SecureStore.getItemAsync("user_data");
        if (!storedData) return;
        // console.log(storedData);
        const parsedUser = JSON.parse(storedData);
        // console.log("parsed:", parsedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error(error);
      }
    };
    initializeUser();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: "#fff", paddingBottom: 16 }}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Image
            source={require("@/assets/images/Vector.png")}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
          <Text style={{ fontWeight: "600", fontSize: 17 }}>Sahara</Text>
        </View>
        <Divider theme={{ colors: { primary: "#000" } }} />
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#fff", paddingTop: 0 }}
      >
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View>
        <Divider />
        <View
          style={{
            padding: 16,
            paddingBottom: 10 + bottom,
            backgroundColor: "#FFFCFF",
          }}
        >
          <TouchableOpacity
            style={styles.footer}
            onPress={async () => {
              try {
                handleLogout();
              } catch (error) {
                console.error("Sign-out error:", error);
              }
            }}
          >
            <Image source={{ uri: userData?.imageUrl }} style={styles.avatar} />
            <Text style={styles.userName}>{userData?.name}</Text>
            <AntDesign name="logout" size={24} color={"#B8B3BA"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
});

export default DrawerContent;
