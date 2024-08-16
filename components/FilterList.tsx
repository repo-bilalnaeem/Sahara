import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ScrollViewProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import categories from "@/assets/data/PharmacyFilter.json";

interface FilterListProps {
  onCategoryChanged: (category: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({ onCategoryChanged }) => {
  const ScrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<(TouchableOpacity | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDarkMode = useColorScheme() === "dark";

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x, y, width, height, pageX) => {
      ScrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].text);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 8,
        }}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            onPress={() => selectCategory(index)}
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            style={
              activeIndex === index
                ? styles.categoriesBtnActive
                : styles.categoriesBtn
            }
          >
            <Text
              style={
                activeIndex === index
                  ? styles.categoryTextActive
                  : isDarkMode
                  ? styles.categoryText
                  : styles.categoryTextDark
              }
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginBottom: 20,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  } as TextStyle,
  categoryTextDark: {
    fontSize: 12,
    color: "#000",
  } as TextStyle,
  categoryTextActive: {
    fontSize: 12,
    color: "#fff",
  } as TextStyle,
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#478EEF",
  } as ViewStyle,
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1661E0",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
  } as ViewStyle,
});

export default FilterList;
