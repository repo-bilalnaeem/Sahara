import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Message, Role } from "@/utils/Interfaces";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import axios from "axios";
import * as Crypto from "expo-crypto";
import { encode } from "base64-arraybuffer";
const BASE_URL = "http://192.168.1.100:8081";
import { toast } from "sonner-native";


let currentSound: Audio.Sound | null = null;

function isPlaybackSuccess(
  status: AVPlaybackStatus
): status is AVPlaybackStatusSuccess {
  return status.isLoaded;
}

const ChatMessage = ({
  content,
  role,
  loading,
}: Message & { loading?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTTSFromOpenAI = async (text: string) => {
    const toastId = toast.loading("Preparing audio...");
    setIsPlaying(true); // Disable the button when playback starts

    try {
      // 🔇 Stop and unload previous audio if playing
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        currentSound = null;
      }

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

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: true }
      );

      currentSound = newSound;

      currentSound.setOnPlaybackStatusUpdate(async (status) => {
        if (isPlaybackSuccess(status)) {
          if (status.didJustFinish) {
            await currentSound?.unloadAsync();
            currentSound = null;
            setIsPlaying(false); // Enable the button again after playback finishes
            toast.success("Audio finished playing!", { id: toastId });
          }
        } else {
          console.error("Playback error:", status.error);
          setIsPlaying(false); // Enable the button again if playback fails
          toast.error("Audio playback failed", { id: toastId });
        }
      });

      toast.success("Audio is playing!", { id: toastId });
    } catch (error) {
      console.error("OpenAI TTS error:", error);
      setIsPlaying(false); // Enable the button if there’s an error
      toast.error("Audio playback failed", { id: toastId });
    }
  };
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
          onPress={() => !isPlaying && playTTSFromOpenAI(content)} // Using OpenAI TTS here
          disabled={isPlaying}
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
