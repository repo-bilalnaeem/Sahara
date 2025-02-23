
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as Haptics from "expo-haptics";
import { categories } from "@/assets/data/SearchFilters";

interface FilterListProps {
  onCategoryChanged: (category: string) => void;
  selectedCategory?: string;
}

const FilterList: React.FC<FilterListProps> = ({
  onCategoryChanged,
  selectedCategory,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<any>>(categories.map(() => null));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (selectedCategory) {
      const index = categories.findIndex(
        (item) => item.text === selectedCategory
      );
      if (index !== -1) {
        setActiveIndex(index);
        scrollToIndex(index); // Smoothly scroll to the selected category
      }
    }
  }, [selectedCategory]);

  const scrollToIndex = (index: number) => {
    const selected = itemsRef.current[index];
    if (selected) {
      selected.measure(
        (x: any, y: any, width: any, height: any, pageX: number) => {
          scrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
        }
      );
    }
  };

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].text);
  };

  return (
    <View style={{}}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            onPress={() => selectCategory(index)}
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
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 12,
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
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  categoriesBtnActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1661E0",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
});

export default FilterList;
