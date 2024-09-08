// import {
//   View,
//   Text,
//   FlatList,
//   Pressable,
//   Image,
//   ImageBackground,
//   StyleSheet,
// } from "react-native";
// import Animated from "react-native-reanimated";
// import React, { useEffect, useRef, useState } from "react";
// import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
// import { router } from "expo-router";
// import NotFound from "./NotFound";

// interface Props {
//   listings: any[];
//   category: string;
// }

// const Listings = ({ listings: items, category }: Props) => {
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef<FlatList>(null);

//   useEffect(() => {
//     console.log("RELOAD LISTINGS", items.length);
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       listRef.current?.scrollToOffset({ animated: true, offset: 0 });
//     }, 200);
//   }, [category]);

//   // Filter the items based on the selected category
//   // const filteredItems = items.filter((item) => category === item.occup);
//   const filteredItems =
//     category === "All"
//       ? items
//       : items.filter(({ occupation }) => occupation === category);

//   const renderRow = ({ item }: any) => (
//     <Pressable onPress={() => router.push("/(doctor)")}>
//       <Animated.View
//         style={{ height: 300 }}
//         entering={FadeInRight}
//         exiting={FadeOutLeft}
//       >
//         <ImageBackground
//           style={styles.backgroundImage}
//           source={{ uri: item.imageSource }}
//         >
//           <LinearGradient
//             colors={[
//               "rgba(0, 0, 0, 0.40)",
//               "rgba(0, 0, 0, 0.50)",
//               "rgba(0, 0, 0, 0.18)",
//             ]}
//             locations={[0.044, 0.2209, 0.566]}
//             start={{ x: 0.5, y: 1 }}
//             end={{ x: 0.5, y: 0 }}
//             style={StyleSheet.absoluteFill}
//           />
//           <View style={styles.professionLabel}>
//             <BlurView intensity={20} style={StyleSheet.absoluteFill} />
//             <Image
//               source={require("../assets/images/Professional.png")}
//               style={{ width: 22, height: 22 }}
//             />
//             <Text style={styles.profession}>Professional Doctor</Text>
//           </View>

//           <View style={styles.ratings}>
//             <BlurView intensity={35} style={StyleSheet.absoluteFill} />
//             <View
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: 7.5,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Image
//                 source={require("../assets/images/StarGold.png")}
//                 style={{ width: 18.46, height: 18, objectFit: "scale-down" }}
//               />
//               <Text
//                 style={{
//                   color: "#FFF",
//                   fontSize: 14,
//                   fontStyle: "normal",
//                   fontWeight: "500",
//                 }}
//               >
//                 {item.ratings}
//               </Text>
//             </View>
//           </View>

//           <Text style={styles.name}>
//             {item.firstName} {item.lastName}
//           </Text>
//           <Text style={styles.speciality}>{item.occupation}</Text>
//           <Pressable style={styles.bookNow}>
//             <Text style={styles.bookText}>Book Now</Text>
//           </Pressable>
//         </ImageBackground>
//       </Animated.View>
//     </Pressable>
//   );

//   return (
//     <View style={{ paddingHorizontal: 13, flex: 1, top: 75 }}>
//       {filteredItems.length === 0 ? (
//         <NotFound />
//       ) : (
//         <FlatList
//           ref={listRef}
//           renderItem={renderRow}
//           data={loading ? [] : filteredItems}
//           contentContainerStyle={styles.listitems}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     height: 500,
//     borderRadius: 24,
//     overflow: "hidden",
//     objectFit: "cover",
//     flex: 1,
//   },
//   listitems: {
//     gap: 16,
//     paddingBottom: 24,
//     marginTop: 120,
//   },
//   name: {
//     color: "#FFF",
//     fontSize: 24,
//     fontStyle: "normal",
//     fontWeight: "600",
//     lineHeight: 22,
//     left: 22,
//     bottom: -223,
//   },
//   speciality: {
//     color: "#FFF",
//     fontSize: 16,
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: 22,
//     left: 22,
//     bottom: -228,
//   },
//   bookNow: {
//     borderRadius: 26,
//     backgroundColor: "#2268FB",
//     paddingHorizontal: 18,
//     paddingVertical: 16,
//     position: "absolute",
//     bottom: 26,
//     right: 22,
//   },
//   bookText: {
//     color: "#FFF",
//     fontSize: 15,
//     fontStyle: "normal",
//     fontWeight: "400",
//   },
//   profession: {
//     color: "#FFF",
//     fontSize: 14,
//     fontStyle: "normal",
//     fontWeight: "400",
//     lineHeight: 13.555,
//   },
//   professionLabel: {
//     display: "flex",
//     flexDirection: "row",
//     gap: 14,
//     top: 20,
//     left: 16,
//     alignItems: "center",
//     position: "absolute",
//     padding: 12,
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   ratings: {
//     position: "absolute",
//     top: 24,
//     right: 16,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 24,
//     overflow: "hidden",
//   },
// });

// export default Listings;
import { router } from "expo-router";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import NotFound from "./NotFound";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD LISTINGS", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }, 200);
  }, [category]);

  // Memoize the filtered items to avoid unnecessary recalculations
  const filteredItems = useMemo(() => {
    return category === "All"
      ? items
      : items.filter(({ occupation }) => occupation === category);
  }, [items, category]);

  const renderRow = ({ item }: any) => (
    <Pressable onPress={() => router.push("/(doctor)")}>
      <Animated.View
        style={{ height: 300 }}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: item.imageSource }}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0.40)",
              "rgba(0, 0, 0, 0.50)",
              "rgba(0, 0, 0, 0.18)",
            ]}
            locations={[0.044, 0.2209, 0.566]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.professionLabel}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            <Image
              source={require("../assets/images/Professional.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.profession}>Professional Doctor</Text>
          </View>

          <View style={styles.ratings}>
            <BlurView intensity={35} style={StyleSheet.absoluteFill} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 7.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/images/StarGold.png")}
                style={{ width: 18.46, height: 18, objectFit: "scale-down" }}
              />
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: "500",
                }}
              >
                {item.ratings}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.speciality}>{item.occupation}</Text>
          <Pressable style={styles.bookNow}>
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );

  return (
    <View style={{ paddingHorizontal: 13, flex: 1, top: 75 }}>
      {filteredItems.length === 0 ? (
        <NotFound />
      ) : (
        <FlatList
          ref={listRef}
          renderItem={renderRow}
          data={loading ? [] : filteredItems}
          contentContainerStyle={styles.listitems}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 500,
    borderRadius: 24,
    overflow: "hidden",
    objectFit: "cover",
    flex: 1,
  },
  listitems: {
    gap: 16,
    paddingBottom: 320,
    marginTop: 120,
  },
  name: {
    color: "#FFF",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
    left: 22,
    bottom: -223,
  },
  speciality: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    left: 22,
    bottom: -228,
  },
  bookNow: {
    borderRadius: 26,
    backgroundColor: "#2268FB",
    paddingHorizontal: 18,
    paddingVertical: 16,
    position: "absolute",
    bottom: 26,
    right: 22,
  },
  bookText: {
    color: "#FFF",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
  },
  profession: {
    color: "#FFF",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 13.555,
  },
  professionLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    top: 20,
    left: 16,
    alignItems: "center",
    position: "absolute",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  ratings: {
    position: "absolute",
    top: 24,
    right: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    overflow: "hidden",
  },
});
export default Listings;
