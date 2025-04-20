import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Link, useNavigation, useRouter } from "expo-router";
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
} from "react-native";
import Colors from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";
import * as ContextMenu from "zeego/context-menu";
import { Keyboard } from "react-native";
import { deleteChat, getChats, renameChat } from "@/utils/Database";
import { Chat } from "@/utils/Interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { useDispatch } from "react-redux";
import { logout } from "@/slices/authSlice";
import { StreamChat } from "stream-chat";
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";
import { User } from "@/app/signin";
import * as SecureStore from "expo-secure-store";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === "open";
  const [history, setHistory] = useState<Chat[]>([]);
  const db = useSQLiteContext();
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

  const router = useRouter();

  useEffect(() => {
    if (isDrawerOpen) {
      loadChats();
    }
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const loadChats = async () => {
    console.log("Loading Chats");
    const result = await getChats(db);
    console.log("Got Chats:", result);
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
          await deleteChat(db, chatId); // Ensure messages are also deleted
          loadChats(); // Refresh chat list after deletion
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

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.greyLight}
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
        <DrawerItem
          label="Home"
          inactiveTintColor="#000"
          onPress={() => router.replace("/(authenticated)/(drawer)/(tabs)")}
          icon={() => (
            <Ionicons
              name="home-outline"
              size={20}
              color={"#000"}
              style={{
                margin: 5,
              }}
            />
          )}
        />

        {history.map((chat) => (
          <ContextMenu.Root key={chat.id}>
            <ContextMenu.Trigger>
              <DrawerItem
                label={chat.title}
                inactiveTintColor="#000"
                onPress={() =>
                  router.push(
                    `/(authenticated)/(services)/(consultation)/${chat.id}`
                  )
                }
              ></DrawerItem>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
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
                key="rename"
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
                key="delete"
                onSelect={() => onDeleteChat(chat.id)}
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
          backgroundColor: Colors.light,
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
          <AntDesign name="logout" size={24} color={Colors.greyLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const router = useRouter();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        // drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}
    >
      <Drawer.Screen
        name="index"
        getId={() => Math.random().toString()}
        options={{
          title: "SaharaBot",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#fff" }]}>
              <Image
                source={require("@/assets/images/Vector.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <Link
              href={"/(authenticated)/(services)/(consultation)/(chat)"}
              push
              asChild
            >
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="[id]"
        options={{
          drawerItemStyle: {
            display: "none",
          },
          headerRight: () => (
            <Link
              href={"/(authenticated)/(services)/(consultation)/(chat)"}
              push
              asChild
            >
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
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
    backgroundColor: Colors.input,
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
    width: 16,
    height: 16,
  },
});

export default Layout;
