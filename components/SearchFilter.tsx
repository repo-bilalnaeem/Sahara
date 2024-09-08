import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import * as Haptics from "expo-haptics";
import { categories } from "@/assets/data/SearchFilters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";

interface FilterListProps {
  onCategoryChanged: (category: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({ onCategoryChanged }) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDarkMode = useColorScheme() === "dark";

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].text);
  };

  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top * 2.4 }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
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
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 0,
    marginVertical: 14,
    marginBottom: 20,
    position: "absolute",
    zIndex: 2,
    shadowColor: "#000",
    shadowRadius: 3,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
  },
  contentContainer: {
    paddingHorizontal: 10, // Add some horizontal padding if needed
    paddingBottom: 16,
    paddingTop: 14,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  },
  categoryTextDark: {
    fontSize: 12,
    color: "#000",
  },
  categoryTextActive: {
    fontSize: 12,
    color: "#fff",
  },
  categoriesBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#478EEF",
    marginHorizontal: 4, // Add horizontal margin for spacing between items
    backgroundColor: "#fff",
  },
  categoriesBtnActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1661E0",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginHorizontal: 4, // Ensure the margin is consistent
  },
});

export default FilterList;
