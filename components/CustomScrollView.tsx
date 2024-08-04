import React, { useRef, RefObject } from "react";
import {
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface CustomScrollViewProps extends ScrollViewProps {}

const CustomScrollView = (props: CustomScrollViewProps) => {
  const scrollViewRef: RefObject<ScrollView> = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset < 0) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  return (
    <ScrollView
      alwaysBounceVertical={false}
      {...props}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Add this line to control the scroll event rate
      />
  );
};

export default CustomScrollView;
