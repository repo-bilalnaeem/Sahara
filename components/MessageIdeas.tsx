import Colors from "@/constants/Colors";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";

const PredefinedMessages = [
  { title: "Need Some Medical Advice", text: "Hey, I have a medical query" },
  {
    title: "Suggest me Home Remedies",
    text: "I have caught the flu",
  },
  { title: "Recommend a health diet", text: "to have a lean body" },
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
            <Text style={{ color: Colors.grey, fontSize: 14 }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
});
export default MessageIdeas;
