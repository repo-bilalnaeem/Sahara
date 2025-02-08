// import React, { useState, useEffect } from "react";
// import { Stack } from "expo-router";
// import { StreamVideo, StreamVideoClient, User, useCall } from "@stream-io/video-react-native-sdk";

// const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

// const StreamLayout = () => {
//   const [client, setClient] = useState<StreamVideoClient | null>(null);

//   useEffect(() => {
//     const setupClient = async () => {
//       try {
//         const streamUser: User = { id: "9a1b0bf5-6cac-4ea6-a0fb-bf139df9a2cf" };

//         const newClient = new StreamVideoClient({
//           apiKey: STREAM_KEY!,
//           user: streamUser,
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWExYjBiZjUtNmNhYy00ZWE2LWEwZmItYmYxMzlkZjlhMmNmIn0.5qs-Hv5j8DEw1XCNb1JSvy9rQKWj7Z3xjXjwjY1MPBA",
//         });

//         setClient(newClient);
//         console.log("StreamVideoClient initialized:", streamUser);
//       } catch (error) {
//         console.error("Error creating StreamVideo client:", error);
//       }
//     };

//     setupClient();

//     return () => {
//       client?.disconnectUser();
//       setClient(null);
//     };
//   }, []);

//   if (!client) return null;

//   return (
//     <StreamVideo client={client}>
//       <CallEventLogger />
//       <Stack>
//         <Stack.Screen name="[id]" options={{ headerShown: false }} />
//       </Stack>
//     </StreamVideo>
//   );
// };

// // Component to listen for call events
// const CallEventLogger = () => {
//   const call = useCall();

//   useEffect(() => {
//     if (!call) return;

//     const handleCallEnd = () => {
//       console.log("Call ended at:", new Date().toLocaleString());
//     };

//     call.on("call.ended", handleCallEnd);

//     return () => {
//       call.off("call.ended", handleCallEnd);
//     };
//   }, [call]);

//   return null; // This component only handles events
// };

// export default StreamLayout;

import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import {
  StreamVideo,
  StreamVideoClient,
  User,
  useCall,
} from "@stream-io/video-react-native-sdk";
import { useCallStore } from "@/store/callStore"; // Import Zustand store

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const StreamLayout = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { setCallActive } = useCallStore();

  useEffect(() => {
    const setupClient = async () => {
      try {
        const streamUser: User = { id: "9a1b0bf5-6cac-4ea6-a0fb-bf139df9a2cf" };

        const newClient = new StreamVideoClient({
          apiKey: STREAM_KEY!,
          user: streamUser,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWExYjBiZjUtNmNhYy00ZWE2LWEwZmItYmYxMzlkZjlhMmNmIn0.5qs-Hv5j8DEw1XCNb1JSvy9rQKWj7Z3xjXjwjY1MPBA",
        });

        setClient(newClient);
        console.log("StreamVideoClient initialized:", streamUser);
      } catch (error) {
        console.error("Error creating StreamVideo client:", error);
      }
    };

    setupClient();

    return () => {
      client?.disconnectUser();
      setClient(null);
    };
  }, []);

  if (!client) return null;

  return (
    <StreamVideo client={client}>
      <CallEventLogger />
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </StreamVideo>
  );
};

// Component to listen for call events
const CallEventLogger = () => {
  const call = useCall();
  const { isCallActive, setCallActive } = useCallStore();

  useEffect(() => {
    if (!call) return;

    const handleCallEnd = () => {
      if (isCallActive) {
        console.log("Call ended at:", new Date().toLocaleString());
        setCallActive(false);
      }
    };

    call.on("call.ended", handleCallEnd);

    return () => {
      call.off("call.ended", handleCallEnd);
    };
  }, [call, isCallActive]);

  return null; // This component only handles events
};

export default StreamLayout;
