import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const PredefinedMessages = [
  {
    title: "Suggest me home remidies",
    text: "how can i treat fever at home",
  },
  { title: "How late can I sleep", text: "Can sleeping late be dangerous" },
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
      >
        {PredefinedMessages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectCard(`${item.title} ${item.text}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {item.title}
            </Text>
            <Text style={{ color: "#242026", fontSize: 14 }}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EEE9F0",
    padding: 14,
    borderRadius: 10,
  },
});
export default MessageIdeas;
