import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Message, Role } from "@/utils/Interfaces";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import axios from "axios";
import * as Crypto from "expo-crypto";
import { encode } from "base64-arraybuffer";
const BASE_URL = "http://192.168.1.102:8081";
import { toast } from "sonner-native";

// const playTTSFromOpenAI = async (text: string) => {
//   const toastId = toast.loading("Preparing audio...");
//   let sound = null;
//   try {
//     const response = await fetch(`${BASE_URL}/api/text-to-speech`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to generate TTS");
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     const base64Audio = encode(arrayBuffer);

//     const fileUri = FileSystem.cacheDirectory + "openai-tts.mp3";
//     await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const fileInfo = await FileSystem.getInfoAsync(fileUri);
//     console.log("📁 TTS file saved at:", fileUri);
//     console.log("📦 File info:", fileInfo);
//     console.log("🧬 Base64 snippet:", base64Audio.slice(0, 50) + "...");

//     // Create and load the sound
//     const { sound: newSound, status } = await Audio.Sound.createAsync(
//       { uri: fileUri },
//       { shouldPlay: true }
//     );

//     sound = newSound;

//     // Add event listener to handle playback errors
//     sound.setOnPlaybackStatusUpdate((status) => {
//       if (status.didJustFinish) {
//         console.log("Playback finished.");
//         sound.unloadAsync(); // Unload when finished
//       }
//       if (status.error) {
//         console.error("Error during playback:", status.error);
//       }
//     });

//     // Wait for the sound to finish before showing success
//     if (status.isLoaded && status.isPlaying) {
//       toast.success("Audio is ready!", { id: toastId });
//     } else {
//       console.error("Audio did not load or play correctly");
//       toast.error("Audio playback failed", { id: toastId });
//     }
//   } catch (error) {
//     console.error("OpenAI TTS error:", error);
//   }
// };
const playTTSFromOpenAI = async (text: string) => {
  const toastId = toast.loading("Preparing audio...");
  let sound: Audio.Sound | null = null;
  try {
    const response = await fetch(`${BASE_URL}/api/text-to-speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate TTS");
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = encode(arrayBuffer);

    const fileUri = FileSystem.cacheDirectory + "openai-tts.mp3";
    await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log("📁 TTS file saved at:", fileUri);
    console.log("📦 File info:", fileInfo);
    console.log("🧬 Base64 snippet:", base64Audio.slice(0, 50) + "...");

    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: fileUri },
      { shouldPlay: true }
    );

    sound = newSound;


  } catch (error) {
    console.error("OpenAI TTS error:", error);
    toast.error("Audio playback failed", { id: toastId });
  }
};

const ChatMessage = ({
  content,
  role,
  loading,
}: Message & { loading?: boolean }) => {
  return (
    <View>
      <View style={styles.row}>
        {role === Role.Bot ? (
          <View style={[styles.item]}>
            <Image
              source={require("@/assets/images/Vector.png")}
              style={styles.btnImage}
            />
          </View>
        ) : (
          <Image
            source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
            style={styles.avatar}
          />
        )}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={Colors.primary} size={"small"} />
          </View>
        ) : (
          <>
            <Text style={styles.text}>{content}</Text>
          </>
        )}
      </View>
      {role === Role.Bot && content && (
        <TouchableOpacity
          style={{ paddingHorizontal: 64 }}
          onPress={() => playTTSFromOpenAI(content)} // Using OpenAI TTS here
        >
          <Feather name="volume-2" size={20} color="#646464" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },

  item: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  btnImage: {
    margin: 2,
    width: 24,
    height: 24,
    objectFit: "contain",
  },

  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: "wrap",
    flex: 1,
  },

  loading: {
    justifyContent: "center",
    height: 26,
    marginLeft: 14,
  },

  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },

  voiceIcon: {
    marginLeft: 8,
    alignSelf: "center",
  },
});

export default ChatMessage;
