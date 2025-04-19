import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranscription } from "@/context/TranscriptionContext";
import * as Haptics from "expo-haptics";

const NewRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const { setAudioUri } = useTranscription(); // assumes context has setAudioUri
  const lottieRef = useRef<LottieView>(null);

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
      router.back(); // return to previous screen
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  const handleClose = () => {
    if (recording) {
      recording.stopAndUnloadAsync().catch(console.error);
    }
    setRecording(null);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}

      <TouchableOpacity
        onPress={handleClose}
        style={[styles.closeButton, { top }]}
      >
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 150,
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#8e8e8e",
          backgroundColor: "#ffffff",
          borderRadius: 200,
          borderWidth: 1,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },

          shadowOpacity: 0.2,
          shadowRadius: 6,

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
          source={require("@/assets/animation/lottie.json")}
          autoPlay={!!recording}
          loop={!!recording}
          style={styles.lottie}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewRecording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  lottie: {
    width: 170,
    height: 170,
    marginBottom: 20,
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
});
