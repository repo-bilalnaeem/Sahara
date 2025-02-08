// import { View, Dimensions } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import InCallManager from "react-native-incall-manager";

// import Spinner from "react-native-loading-spinner-overlay";
// import {
//   Call,
//   CallContent,
//   StreamCall,
//   useStreamVideoClient,
// } from "@stream-io/video-react-native-sdk";

// import CustomCallControls from "@/components/CustomCallControls";

// const WIDTH = Dimensions.get("window").width;
// const HEIGHT = Dimensions.get("window").height;

// const Page = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();
//   const client = useStreamVideoClient();

//   const [call, setCall] = useState<Call | null>(null);

//   useEffect(() => {
//     if (!client || call) return;

//     const joinCall = async () => {
//       try {
//         const newCall = client.call("default", id);
//         await newCall.join({ create: true });

//         // Enable proper audio session handling
//         InCallManager.start({ media: "video" });
//         InCallManager.setKeepScreenOn(true);
//         InCallManager.setForceSpeakerphoneOn(true);

//         setCall(newCall);
//       } catch (error) {
//         console.error("Error joining call:", error);
//       }
//     };

//     joinCall();

//     return () => {
//       InCallManager.stop();
//     };
//   }, [client, call, id]);

//   // Function to properly end the call and navigate back
//   const goToHomeScreen = async () => {
//     if (call) {
//       await call.endCall(); // Ensure the call is ended
//       console.log(`Call ended at: ${new Date().toLocaleString()}`);
//     }
//     router.back(); // Navigate back after ending the call
//   };

//   // Listen for call end event
//   useEffect(() => {
//     if (!call) return;

//     const handleCallEnd = () => {
//       console.log(`Call ended at: ${new Date().toLocaleString()}`);
//       router.back(); // Navigate back automatically if call ends
//     };

//     call.on("call.ended", handleCallEnd);

//     return () => {
//       call.off("call.ended", handleCallEnd);
//     };
//   }, [call]);

//   if (!call) return null;

//   return (
//     <View style={{ flex: 1 }}>
//       <Spinner visible={!call} />

//       <StreamCall call={call}>
//         <CallContent
//           onHangupCallHandler={goToHomeScreen} // Calls goToHomeScreen to end call first
//           layout="grid"
//           CallControls={CustomCallControls}
//         />
//       </StreamCall>
//     </View>
//   );
// };

// export default Page;

import { View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import InCallManager from "react-native-incall-manager";
import {
  Call,
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import CustomCallControls from "@/components/CustomCallControls";
import { useCallStore } from "@/store/callStore"; // Import Zustand store

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const client = useStreamVideoClient();
  const { isCallActive, setCallActive } = useCallStore();

  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      try {
        const newCall = client.call("default", id);
        await newCall.join({ create: true });

        // Enable proper audio session handling
        InCallManager.start({ media: "video" });
        InCallManager.setKeepScreenOn(true);
        InCallManager.setForceSpeakerphoneOn(true);

        setCall(newCall);
        setCallActive(true); // Mark call as active
      } catch (error) {
        console.error("Error joining call:", error);
      }
    };

    joinCall();

    return () => {
      InCallManager.stop();
    };
  }, [client, call, id]);

  // Function to properly end the call and navigate back
  const goToHomeScreen = async () => {
    if (call && isCallActive) {
      await call.endCall();
      console.log(`Call ended at: ${new Date().toLocaleString()}`);
      setCallActive(false); // Mark call as inactive
      router.back();
    }
  };

  // Listen for call end event
  useEffect(() => {
    if (!call) return;

    const handleCallEnd = () => {
      if (isCallActive) {
        console.log(`Call ended at: ${new Date().toLocaleString()}`);
        setCallActive(false);
        router.back();
      }
    };

    call.on("call.ended", handleCallEnd);

    return () => {
      call.off("call.ended", handleCallEnd);
    };
  }, [call, isCallActive]);

  if (!call) return null;

  return (
    <View style={{ flex: 1 }}>
      <StreamCall call={call}>
        <CallContent
          onHangupCallHandler={goToHomeScreen}
          layout="grid"
          CallControls={CustomCallControls}
        />
      </StreamCall>
    </View>
  );
};

export default Page;
