import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Link, router, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import PharmacyHeader from "@/components/PharmacyHeader";
import { Divider } from "react-native-paper";
import { CustomHeader } from "@/components/CustomHeader";
import { useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";
import { StreamChat } from "stream-chat";
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";
import { User } from "@/app/signin";
import * as SecureStore from "expo-secure-store";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const DrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === "open";
  const dispatch = useDispatch();
  const [triggerGetLoggedUser] = useLazyGetLoggedUserQuery();

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
    const fetchUser = async () => {
      try {
        const profile = await triggerGetLoggedUser().unwrap();
        const userFromApi = profile.user;

        const formattedUser: User = {
          id: userFromApi.id,
          name: `${userFromApi.Customer?.firstName ?? ""} ${
            userFromApi.Customer?.lastName ?? ""
          }`.trim(),
          email: userFromApi.email,
          imageUrl: userFromApi.Customer?.imageUrl ?? "", // fallback to empty string if null
        };

        setUserData(formattedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  // console.log("User data", userData);

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
            <Text style={styles.userName}>{userData?.name} </Text>
            <AntDesign name="logout" size={24} color={"#B8B3BA"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CutsomDrawer = () => {
  const dimensions = useWindowDimensions();
  const router = useRouter();

  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFCFF",
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: "#F7F2F9",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: undefined,
          drawerIcon: () => null,
          drawerLabel: () => null,
          drawerItemStyle: { display: "none" },
          header: () => <PharmacyHeader />,
        }}
      />
      <Drawer.Screen
        name="offers"
        options={{
          title: "Offers",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/discount.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => <PharmacyHeader />,
        }}
      />
      <Drawer.Screen
        name="vouchers"
        options={{
          title: "Vouchers",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/voucher.png")}
                style={styles.btnImage}
              />
            </View>
          ),

          header: () => (
            <CustomHeader onPress={router.back} heading="Vouchers & offers" />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          title: "Orders",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/order.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => <CustomHeader onPress={router.back} heading="Orders" />,
        }}
      />

      <Drawer.Screen
        name="address"
        options={{
          title: "Addresses",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/address.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => (
            <CustomHeader onPress={router.back} heading="Addresses" />
          ),
        }}
      />
      <Drawer.Screen
        name="helpCenter"
        options={{
          title: "Help Center",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/help.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => (
            <CustomHeader onPress={router.back} heading="Help Center" />
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 16,
  },
  roundImage: {
    width: 30,
    height: 30,
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
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 24,
    height: 24,
  },
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    // backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    zIndex: 2,
  },
});

export default CutsomDrawer;
