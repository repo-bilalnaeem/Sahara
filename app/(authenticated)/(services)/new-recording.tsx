import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranscription } from "@/context/TranscriptionContext";
import * as Haptics from "expo-haptics";
import { Animated } from "react-native";
import * as FileSystem from "expo-file-system";
const NewRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const { setAudioUri } = useTranscription(); // assumes context has setAudioUri
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start fully visible
  const [displayText, setDisplayText] = useState("Tap to Speak");
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const startRecording = async () => {
    try {
      const permissionResponse = await Audio.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") {
        Alert.alert("Permission not granted");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);

      // Start alternating text
      let toggle = false;
      intervalRef.current = setInterval(() => {
        toggle = !toggle;
        fadeText(toggle ? "Listening..." : "Tap to stop recording");
      }, 2500);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording URI:", uri);

      if (uri) {
        setAudioUri(uri); // store in context
      }

      lottieRef.current?.reset();
      setRecording(null);
      fadeText("Tap to Speak");
      router.back(); // return to previous screen
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  const handleClose = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync(); // stop & release audio resource
        const uri = recording.getURI();

        if (uri) {
          console.log("🛑 Discarding recording at URI:", uri);

          await FileSystem.deleteAsync(uri, { idempotent: true });

          const fileInfo = await FileSystem.getInfoAsync(uri);
          if (!fileInfo.exists) {
            console.log("✅ Recording successfully deleted.");
          } else {
            console.warn(
              "⚠️ Recording file still exists after delete attempt."
            );
          }
        }

        lottieRef.current?.reset();
      }
    } catch (error) {
      console.error("Error cleaning up recording on close:", error);
    } finally {
      setRecording(null);
      fadeText("Tap to Speak"); // reset label
      router.back();
    }
  };

  const fadeText = (newText: string) => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      // Once faded out, change text
      setDisplayText(newText);

      // Then fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.container}>
        <Pressable style={styles.card}>
          <TouchableOpacity
            onPress={handleClose}
            style={[styles.closeButton, { top: top / 2, marginBottom: 24 }]}
          >
            <Ionicons name="close" size={24} color="#505050" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 200,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#d6d6d6",
              backgroundColor: "#ffffff",
              borderRadius: 200,

              shadowColor: "#000000a2",
              shadowOffset: {
                width: 0,
                height: 4,
              },

              shadowOpacity: 0.2,
              shadowRadius: 10,

              // Android shadow
              elevation: 6,
            }}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              recording ? stopRecording() : startRecording();
            }}
            // onPress={recording ? stopRecording : startRecording}
          >
            <LottieView
              ref={lottieRef}
              source={require("@/assets/animation/animation-2.json")}
              autoPlay={!!recording}
              loop={!!recording}
              style={styles.lottie}
            />
          </TouchableOpacity>

          <Animated.Text
            style={{
              fontSize: 22,
              marginTop: "15%",
              fontWeight: "500",
              color: "#4e4c4c",
              opacity: fadeAnim,
            }}
          >
            {displayText}
          </Animated.Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewRecording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7372724b",

    alignItems: "flex-end",
  },
  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
    width: 30,
    height: 30,
  },
  lottie: {
    width: "80%",
    height: "100%",
    objectFit: "contain",
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#ff4444",
  },
  notRecordingButton: {
    backgroundColor: "#4444ff",
  },

  card: {
    backgroundColor: "#fff",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    marginHorizontal: 10,
    flexGrow: 1,
    marginBottom: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderColor: "gray",
  },
});
