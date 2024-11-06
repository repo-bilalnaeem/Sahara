// import ChatMessageBox from "@/components/ChatMessageBox";
// import ReplyMessageBar from "@/components/ReplyMessageBar";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import { ImageBackground, StyleSheet, View, Text } from "react-native";
// import { Swipeable } from "react-native-gesture-handler";
// import {
//   GiftedChat,
//   Bubble,
//   InputToolbar,
//   Send,
//   SystemMessage,
//   IMessage,
// } from "react-native-gifted-chat";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import messageData from "@/assets/data/messages.json";

// const Page = () => {
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [text, setText] = useState("");
//   const insets = useSafeAreaInsets();

//   const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
//   const swipeableRowRef = useRef<Swipeable | null>(null);

//   useEffect(() => {
//     setMessages([
//       ...messageData.map(
//         (message: {
//           id: any;
//           msg: any;
//           date: string | number | Date;
//           from: any;
//         }) => {
//           return {
//             _id: message.id,
//             text: message.msg,
//             createdAt: new Date(message.date),
//             user: {
//               _id: message.from,
//               name: message.from ? "You" : "Bob",
//             },
//           };
//         }
//       ),
//       {
//         _id: 0,
//         system: true,
//         text: "All your base are belong to us",
//         createdAt: new Date(),
//         user: {
//           _id: 0,
//           name: "Bot",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages: any[]) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   const renderInputToolbar = (props: any) => {
//     return (
//       <InputToolbar
//         {...props}
//         containerStyle={{ backgroundColor: "#EFEEF6" }}

//         renderActions={() => (
//           <View
//             style={{
//               // marginTop:10,
//               height: 55,
//               justifyContent: "center",
//               alignItems: "center",
//               left: 5,
//             }}
//           >
//             <Ionicons name="add" color={"#1063FD"} size={28} />
//           </View>
//         )}
//       />
//     );
//   };

//   const updateRowRef = useCallback(
//     (ref: any) => {
//       if (
//         ref &&
//         replyMessage &&
//         ref.props.children.props.currentMessage?._id === replyMessage._id
//       ) {
//         swipeableRowRef.current = ref;
//       }
//     },
//     [replyMessage]
//   );

//   useEffect(() => {
//     if (replyMessage && swipeableRowRef.current) {
//       swipeableRowRef.current.close();
//       swipeableRowRef.current = null;
//     }
//   }, [replyMessage]);

//   return (
//     <ImageBackground
//       source={require("@/assets/images/pattern.png")}
//       style={{
//         flex: 1,
//         backgroundColor: "#EFEEF6",
//         marginBottom: insets.bottom,
//         // marginBottom: 20,
//         // paddingVertical: 20,
//       }}
//     >

//       {/* <GiftedChat

//         messages={messages}
//         onSend={(messages: any) => onSend(messages)}
//         onInputTextChanged={setText}
//         user={{
//           _id: 1,
//         }}
//         renderSystemMessage={(props) => (
//           <SystemMessage {...props} textStyle={{ color: "#6E6E73" }} />
//         )}
//         bottomOffset={insets.bottom}
//         renderAvatar={null}
//         maxComposerHeight={100}
//         textInputProps={styles.composer}
//         renderBubble={(props) => {
//           return (
//             <Bubble
//               {...props}
//               textStyle={{
//                 right: {
//                   color: "#000",
//                 },
//               }}
//               wrapperStyle={{
//                 left: {
//                   backgroundColor: "#fff",
//                 },
//                 right: {
//                   backgroundColor: "#DBFFCB",
//                 },
//               }}
//             />
//           );
//         }}
//         renderSend={(props) => (
//           <View
//             style={{
//               height: 55,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 14,
//               paddingHorizontal: 14,
//               // paddingBottom: 10,
//         // backgroundColor: "#EFEEF6",

//             }}
//           >
//             {text === "" && (
//               <>
//                 <Ionicons name="camera-outline" color={"#1063FD"} size={28} />
//                 <Ionicons name="mic-outline" color={"#1063FD"} size={28} />
//               </>
//             )}
//             {text !== "" && (
//               <Send
//                 {...props}
//                 containerStyle={{
//                   justifyContent: "center",
//                 }}
//               >
//                 <Ionicons name="send" color={"#1063FD"} size={28} />
//               </Send>
//             )}
//           </View>
//         )}
//         renderInputToolbar={renderInputToolbar}
//         renderChatFooter={() => (
//           <ReplyMessageBar
//             clearReply={() => setReplyMessage(null)}
//             message={replyMessage}
//           />
//         )}
//         onLongPress={(context, message) => setReplyMessage(message)}
//         renderMessage={(props) => (
//           <ChatMessageBox
//             {...props}
//             setReplyOnSwipeOpen={setReplyMessage}
//             updateRowRef={updateRowRef}
//           />
//         )}
//       /> */}
//     </ImageBackground>
//     // <View>
//     //   <Text>hello</Text>
//     // </View>
//   );
// };

// const styles = StyleSheet.create({
//   composer: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "#DCDCE2",
//     paddingHorizontal: 10,
//     // paddingTop: 8,
//     fontSize: 16,
//     // marginVertical: 10,
//     marginBottom: 10
//   },
// });

// export default Page;

import ChatMessageBox from "@/components/ChatMessageBox";
import ReplyMessageBar from "@/components/ReplyMessageBar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import messageData from "@/assets/data/messages.json";
import { Swipeable } from "react-native-gesture-handler";

const Page = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => ({
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.date),
        user: { _id: message.from, name: message.from ? "You" : "Bob" },
      })),
      {
        _id: 0,
        system: true,
        text: "All your base are belong to us",
        createdAt: new Date(),
        user: { _id: 0, name: "Bot" },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderInputToolbar = useCallback(
    (props: any) => (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        renderActions={() => (
          <View style={styles.iconContainer}>
            <Ionicons name="add" color={"#1063FD"} size={28} />
          </View>
        )}
      />
    ),
    []
  );

  const renderBubble = useCallback(
    (props: any) => (
      <Bubble
        {...props}
        textStyle={{ right: { color: "#000" } }}
        wrapperStyle={{
          left: { backgroundColor: "#fff" },
          right: { backgroundColor: "#DBFFCB" },
        }}
      />
    ),
    []
  );

  const renderSend = useCallback(
    (props: any) => (
      <View style={styles.sendContainer}>
        {text === "" ? (
          <>
            <Ionicons name="camera-outline" color={"#1063FD"} size={28} />
            <Ionicons name="mic-outline" color={"#1063FD"} size={28} />
          </>
        ) : (
          <Send {...props}>
            <Ionicons name="send" color={"#1063FD"} size={28} />
          </Send>
        )}
      </View>
    ),
    [text]
  );

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <ImageBackground
      source={require("@/assets/images/pattern.png")}
      style={[styles.background, { marginBottom: insets.bottom }]}
    >
      <GiftedChat
        scrollToBottom
        isStatusBarTranslucentAndroid={true}
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{ _id: 1 }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={styles.systemMessage} />
        )}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        // initialNumToRender={10}
        maxComposerHeight={80}
        textInputProps={styles.composer}
        renderBubble={renderBubble}
        keyboardShouldPersistTaps="never"
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#EFEEF6",
  },
  inputToolbar: {
    backgroundColor: "#EFEEF6",
  },
  iconContainer: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    left: 5,
  },
  sendContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 14,
  },
  composer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCDCE2",
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  systemMessage: {
    color: "#6E6E73",
  },
});

export default Page;
