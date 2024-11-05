import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Href, Link, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Alert,
  Keyboard,
  useColorScheme,
  Platform,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite/next";
import { useEffect, useState } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Chat } from "@/utils/Interfaces";
import * as ContextMenu from "zeego/context-menu";
import { getChats, renameChat } from "@/utils/Database";
import React from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const db = useSQLiteContext();
  const isDrawerOpen = useDrawerStatus() === "open";
  const [history, setHistory] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadChats();
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const loadChats = async () => {
    // Load chats from SQLite
    const result = (await getChats(db)) as Chat[];
    setHistory(result);
  };

  const onDeleteChat = (chatId: number) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          // Delete the chat
          await db.runAsync("DELETE FROM chats WHERE id = ?", chatId);
          loadChats();
        },
      },
    ]);
  };

  const onRenameChat = (chatId: number) => {
    Alert.prompt(
      "Rename Chat",
      "Enter a new name for the chat",
      async (newName) => {
        if (newName) {
          // Rename the chat
          await renameChat(db, chatId, newName);
          loadChats();
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={"#B8B3BA"}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#fff", paddingTop: 0 }}
      >
        <DrawerItemList {...props} />
        {history.map((chat) => (
          <ContextMenu.Root key={chat.id}>
            <ContextMenu.Trigger>
              <DrawerItem
                label={chat.title}
                onPress={() =>
                  router.push(
                    `/(chat)/${chat.id}`
                  )
                }
                inactiveTintColor="#000"
              />
            </ContextMenu.Trigger>
            <ContextMenu.Content
              loop={false} 
              alignOffset={0} 
              avoidCollisions={true} 
              collisionPadding={10}
            >
              <ContextMenu.Preview>
                {() => (
                  <View
                    style={{
                      padding: 16,
                      height: 200,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text>{chat.title}</Text>
                  </View>
                )}
              </ContextMenu.Preview>

              <ContextMenu.Item
                key={"rename"}
                onSelect={() => onRenameChat(chat.id)}
              >
                <ContextMenu.ItemTitle>Rename</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: "pencil",
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
              <ContextMenu.Item
                key={"delete"}
                onSelect={() => onDeleteChat(chat.id)}
                destructive
              >
                <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: "trash",
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </DrawerContentScrollView>

      <View
        style={{
          padding: 16,
          paddingBottom: 10 + bottom,
          backgroundColor: "#FFFCFF",
        }}
      >
        <Link
          href="/"
          asChild
        >
          <TouchableOpacity style={styles.footer}>
            <Image
              source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Mika Meerkat</Text>
            <Ionicons name="ellipsis-horizontal" size={24} color={"#B8B3BA"} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              onPress={router.back}
              style={[
                { marginHorizontal: 13 },
                isDarkMode ? styles.lightBackButton : styles.darkBackButton,
              ]}
            >
              <Image
                style={[
                  { width: 20 },
                  { height: 20 },
                  isDarkMode ? null : { tintColor: "#fff" },
                ]}
                source={require("@/assets/images/arrow.png")}
              />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "#FFFCFF",
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: "#F7F2F9",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}
    >
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: "SaharaBot",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                source={require("@/assets/images/logo-white.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // gap: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                style={{ marginRight: 20 }}
              >
                <FontAwesome6 name="grip-lines" size={20} color={"#242026"} />
              </TouchableOpacity>
            </View>
          ),

          ...(Platform.OS === "android" && {
            headerTitleContainerStyle: { paddingTop: 20 },
            headerLeftContainerStyle: { paddingTop: 20 },
            headerRightContainerStyle: { paddingTop: 20 },
          }),
        }}
      />
      <Drawer.Screen
        name="(chat)/[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
          headerRight: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // gap: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                style={{ marginRight: 20 }}
              >
                <FontAwesome6 name="grip-lines" size={20} color={"#242026"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="chats"
        options={{
          title: "Explore GPTs",
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: "#fff",
                  width: 28,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE9F0",
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: "center",
    color: "#424242",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },

  lightBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  darkBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },
});

export default Layout;
