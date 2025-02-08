import { Ionicons } from "@expo/vector-icons";
import {
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Keyboard, View, TouchableOpacity, Image, Text } from "react-native";
import { Divider } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === "open";

  useEffect(() => {
    Keyboard.dismiss();
  }, [isDrawerOpen]);

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
          <Link href="/" asChild>
            <TouchableOpacity style={styles.footer}>
              <Image
                source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>Bilal Naeem</Text>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={"#B8B3BA"}
              />
            </TouchableOpacity>
          </Link>
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
