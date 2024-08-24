import BottomSheet from "@gorhom/bottom-sheet";
import {
  CallControlProps,
  useCall,
  HangUpCallButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ToggleCameraFaceButton,
  ReactionsButton,
  StreamReactionType,
} from "@stream-io/video-react-native-sdk";
import React from "react";
import { View, StyleSheet, Button, useWindowDimensions } from "react-native";

// Custom View for the call controls and reactions
const CustomCallControls = (props: CallControlProps) => {
  const call = useCall();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.customCallControlsContainer, { width }]}>
      <ToggleAudioPublishingButton
        onPressHandler={() => call?.microphone.toggle()}
      />
      <ToggleVideoPublishingButton
        onPressHandler={() => call?.camera.toggle()}
      />
      <ToggleCameraFaceButton onPressHandler={() => call?.camera.flip()} />
      <HangUpCallButton onHangupCallHandler={props.onHangupCallHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  customCallControlsContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    // right: 0,
    bottom: 0,
    // gap: 10,
    // marginHorizontal: 10,
    paddingVertical: 18,
    paddingHorizontal: 28,
    justifyContent: "space-around",
    backgroundColor: "gray",
    // borderRadius: 6,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    // borderColor: "#fff",
    // borderWidth: 2,
    zIndex: 5,
  },
});

export default CustomCallControls;
