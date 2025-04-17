// import {
//   View,
//   Text,
//   Platform,
//   ScrollView,
//   FlatList,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Linking,
//   ActivityIndicator,
//   Animated,
//   Easing,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { Stack, useLocalSearchParams } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
// import DatePickerComponent from "@/components/diseases/DatePickerComponent";

// interface Disease {
//   name: string;
//   image: string;
//   description: string;
//   symptoms: string[]; // Use string[] for an array of strings
// }
// interface Carousel {
//   images: string[];
//   res_id: string;
// }

// const Disease = () => {
//   const { disease } = useLocalSearchParams();
//   const [diseaseData, setDiseaseData] = useState<Disease[]>();
//   const [carouselData, setCarouselData] = useState<Carousel[]>();
//   const windowWidth = Dimensions.get("window").width;
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const flatListRef = useRef<FlatList<string> | null>(null);

//   const handleNextImage = () => {
//     const carouselLength = carouselData?.[0]?.images.length ?? 0;
//     if (currentIndex < carouselLength - 1) {
//       const nextIndex = currentIndex + 1;
//       setCurrentIndex(nextIndex);
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     }

//     if (currentIndex == carouselLength - 1) {
//       const nextIndex = 0;
//       setCurrentIndex(nextIndex);
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     }
//   };
//   const handlePreviousImage = () => {
//     const carouselLength = carouselData?.[0]?.images.length ?? 0;
//     if (currentIndex > 0) {
//       const previousIndex = currentIndex - 1;
//       setCurrentIndex(previousIndex);
//       flatListRef.current?.scrollToIndex({
//         index: previousIndex,
//         animated: true,
//       });
//     }

//     if (currentIndex == 0) {
//       const previousIndex = carouselLength - 1;
//       setCurrentIndex(previousIndex);
//       flatListRef.current?.scrollToIndex({
//         index: previousIndex,
//         animated: true,
//       });
//     }
//   };

//   const carouselItem = ({ item }: { item: any }) => {
//     return (
//       // <View style={{ width: windowWidth - 2 }} className="h-64 relative">
//       <View style={{ width: 370 }} className="bg-cover h-64 w-full relative">
//         <View
//           style={{
//             position: "absolute",
//             top: "35%",
//             backgroundColor: "#6b728037",
//             borderRadius: 50,
//             padding: 5,
//             zIndex: 10,
//             right: "5%",
//           }}
//         >
//           <TouchableOpacity onPress={handleNextImage}>
//             <Ionicons name="arrow-forward" size={24} color="#f9fafb" />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             position: "absolute",
//             top: "35%",
//             backgroundColor: "#6b728037",
//             borderRadius: 50,
//             padding: 5,
//             zIndex: 10,
//             left: "2%",
//           }}
//         >
//           <TouchableOpacity onPress={handlePreviousImage}>
//             <Ionicons name="arrow-back" size={24} color="#f9fafb" />
//           </TouchableOpacity>
//         </View>
//         <View>
//           <View
//             style={{
//               position: "absolute",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "row",
//               left: "50%",
//               transform: [{ translateX: -50 }],
//               zIndex: 10,
//               bottom: 15,
//             }}
//           >
//             {carouselData?.[0].images?.map((_, i) => (
//               <View
//                 key={i}
//                 className={`bg-iconBgs-green-bg h-2 w-2 ${
//                   i == currentIndex && "h-3 w-3"
//                 } p-1 mx-1 rounded-full`}
//               />
//             ))}
//           </View>
//           <Image
//             source={{ uri: item }}
//             style={{
//               marginRight: 0,
//               height: 200,
//               width: "auto",
//             }}
//             resizeMode="cover"
//           />
//         </View>
//       </View>
//     );
//   };

//   const getDiseasesData = async () => {
//     try {
//       const diseaseQuery = query(
//         collection(db, "diseases"),
//         where("name", "==", disease)
//       );
//       const diseaseSnapshot = await getDocs(diseaseQuery);
//       if (diseaseSnapshot.empty) {
//         console.log("No matching disease found");
//         return;
//       }
//       const fetchedDiseases: Disease[] = [];
//       for (const doc of diseaseSnapshot.docs) {
//         const diseaseData = doc.data();

//         // Validate and transform the data if necessary
//         if (
//           typeof diseaseData.name === "string" &&
//           typeof diseaseData.image === "string" &&
//           typeof diseaseData.description === "string" &&
//           Array.isArray(diseaseData.symptoms)
//         ) {
//           fetchedDiseases.push(diseaseData as Disease);
//         } else {
//           console.warn("Invalid disease data structure:", diseaseData);
//         }

//         // setDiseaseData(diseaseData as Disease[]);
//         setDiseaseData(fetchedDiseases);

//         const carouselQuery = query(
//           collection(db, "carousel"),
//           where("res_id", "==", doc.ref)
//         );
//         const carouselSnapshot = await getDocs(carouselQuery);
//         const carouselImages: Carousel[] = [];
//         if (carouselSnapshot.empty) {
//           console.log("No matching carousel found");
//           return;
//         }
//         carouselSnapshot.forEach((carouselDoc) => {
//           const carouseldata = carouselDoc.data() as Carousel;

//           carouselImages.push(carouseldata);
//         });
//         setCarouselData(carouselImages);
//       }
//     } catch (error) {
//       console.log("Error fetching data", error);
//     }
//   };
//   const handleLocation = async () => {
//     const url = "https://maps.app.goo.gl/TtSmNr394bVp9J8n8";
//     const supported = await Linking.canOpenURL(url);
//     if (supported) {
//       await Linking.openURL(url);
//     } else {
//       console.log("Don't know how to open URL", url);
//     }
//   };
//   useEffect(() => {
//     getDiseasesData();
//   }, []);
//   // console.log("carouseldata [0] element here", carouselData?.[0]?.images);
//   console.log("diseasesdata here", diseaseData?.[0]?.name);

//   // Automatically scroll the FlatList
//   useEffect(() => {
//     if (!carouselData || !carouselData[0]?.images?.length) return;
//     const interval = setInterval(() => {
//       const carouselLength = carouselData?.[0]?.images.length ?? 0;
//       console.log("carouselLength", carouselLength);

//       const nextIndex = (currentIndex + 1) % carouselLength; // Loop back to the first image
//       console.log("nextIndex", nextIndex);
//       setCurrentIndex(nextIndex);
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//     }, 2000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, [currentIndex, carouselData]);

//   // Skeleton Card Component
//   const SkeletonCard = () => {
//     const opacity = new Animated.Value(0.3);

//     useEffect(() => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(opacity, {
//             toValue: 1,
//             duration: 800,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 0.3,
//             duration: 800,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     }, []);

//     return (
//       <Animated.View
//         style={{ opacity }}
//         className=" p-2 w-56 max-h-56 bg-white rounded-xl mx-1 overflow-hidden"
//       >
//         {/* Image Placeholder */}
//         <View className="h-28 bg-gray-300 rounded-t-xl" />

//         {/* Text and Button placeholders */}
//         <View className="mt-2">
//           {/* Title */}
//           <View className="h-5 bg-gray-300 rounded w-32 mb-2" />
//           {/* Description line 1 */}
//           <View className="h-3 bg-gray-300 rounded w-40 mb-1" />
//           {/* Description line 2 */}
//           <View className="h-3 bg-gray-300 rounded w-36 mb-3" />

//           {/* Button Placeholder */}
//           <View className="w-[45px] h-6 rounded-xl bg-gray-300" />
//         </View>
//       </Animated.View>
//     );
//   };

//   return (
//     // <SafeAreaView
//     //   style={[
//     //     { backgroundColor: "#f7f7fc" },
//     //     Platform.OS == "android" && { paddingBottom: 0 },
//     //     Platform.OS == "ios" && { paddingBottom: 20 },
//     //   ]}
//     // >
//     <View className="flex-1 bg-gray-50">
//       <View style={{ flex: -1 }}>
//         <Stack.Screen
//           options={{
//             headerShown: true,
//             title: disease ? `${disease}` : "", // Dynamically set the title
//             headerBackTitle: "Back",
//             presentation: "card", // or 'modal', 'transparentModal'
//             animation: "slide_from_right", // 'fade', 'slide_from_bottom', etc.
//             headerStyle: {
//               backgroundColor: "#a855f7", // Change the background color of the header
//             },
//             headerTitleStyle: {
//               fontSize: 20, // Change the font size of the title
//               fontWeight: "semibold", // Make the title bold
//               color: "#F3E8FF", // Change the color of the title
//             },
//             headerTintColor: "#F3E8FF", // Change the color of the back button
//           }}
//         />
//         <View className=" ">
//           {(carouselData?.[0]?.images?.length ?? 0) > 0 ? (
//             <FlatList
//               ref={flatListRef}
//               data={carouselData?.[0]?.images} // Provide an empty array as a fallback
//               renderItem={carouselItem}
//               horizontal
//               scrollEnabled={false}
//               showsHorizontalScrollIndicator={false}
//             />
//           ) : (
//             <View
//               style={{
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ActivityIndicator
//                 animating
//                 color={"#a855f7"}
//                 size={"large"}
//                 style={{ marginTop: 10, marginBottom: 10 }}
//               />
//               <Text style={{ color: "#a855f7", marginBottom: 30 }}>
//                 Loading...
//               </Text>
//             </View>
//           )}
//         </View>

//         <ScrollView
//           style={{
//             height: 450,
//             marginTop: -24,
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* <View className="flex-1 flex-row mt-4 mx-2 p-2">
//             <Ionicons name="location-sharp" size={24} color="#7C3AED" />
//             <Text className="max-w-[75%] text-color4 font-bold">
//               {diseaseData?.[0].name} |{"  "}
//               <Text
//                 onPress={handleLocation}
//                 className="underline flex items-center mt-1 text-color4 italic font-semibold"
//               >
//                 Get Direction
//               </Text>
//             </Text>
//           </View> */}
//           {/* <View className="flex-1 mx-2 p-2">
//             <Image
//               source={{ uri: diseaseData?.[0].image }}
//               className="h-56 rounded-[25px]"
//               style={{
//                 height: 120,
//                 width: 200,
//                 borderRadius: 10,
//               }}
//               resizeMode="cover"
//             />
//           </View> */}
//           <View className=" p-2">
//             <View>
//               <Text className="text-text-dark text-lg font-bold mx-2 mt-2">
//                 Description
//               </Text>
//               <Text className="text-text-medium text-base mx-2 mt-2">
//                 {diseaseData?.[0].description}
//               </Text>
//             </View>
//             <View>
//               <Text className="text-text-dark text-lg font-bold mx-2 mt-2">
//                 Symptoms
//               </Text>
//               <Text className="text-text-medium text-base mx-2 mt-2">
//                 {diseaseData?.[0].symptoms.map((symptom, index) => (
//                   <Text key={index} className="text-color1 text-base mx-2 mt-2">
//                     {symptom}
//                     {index !== diseaseData[0].symptoms.length - 1 && "\n"}
//                   </Text>
//                 ))}
//               </Text>
//             </View>
//           </View>
//           {/* <View className="flex-1 mx-3 mt-5">
//             <DatePickerComponent onConfirm={(date) => setSelectedDate(date)} />
//             <Text className="text-lg mt-2 text-color4 mb-4">
//               {selectedDate
//                 ? selectedDate.toLocaleString()
//                 : "No date selected"}
//             </Text>
//           </View> */}
//         </ScrollView>
//       </View>
//       {/* </SafeAreaView> */}
//     </View>
//   );
// };

// export default Disease;

// ***************************************************************************************************************
// ***************************************************************************************************************
import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import DatePickerComponent from "@/components/diseases/DatePickerComponent";
import { LinearGradient } from "expo-linear-gradient";

interface Disease {
  name: string;
  image: string;
  description: string;
  symptoms: string[]; // Use string[] for an array of strings
}
interface Carousel {
  images: string[];
  res_id: string;
}

const Disease = () => {
  const { disease } = useLocalSearchParams();
  const [diseaseData, setDiseaseData] = useState<Disease[]>();
  const [carouselData, setCarouselData] = useState<Carousel[]>();
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const flatListRef = useRef<FlatList<string> | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNextImage = () => {
    const carouselLength = carouselData?.[0]?.images.length ?? 0;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }

    if (currentIndex == carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };
  const handlePreviousImage = () => {
    const carouselLength = carouselData?.[0]?.images.length ?? 0;
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      flatListRef.current?.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }

    if (currentIndex == 0) {
      const previousIndex = carouselLength - 1;
      setCurrentIndex(previousIndex);
      flatListRef.current?.scrollToIndex({
        index: previousIndex,
        animated: true,
      });
    }
  };

  const carouselItem = ({ item }: { item: any }) => {
    return (
      // <View style={{ width: windowWidth - 2 }} className="h-64 relative">
      <View style={{ width: 370 }} className="bg-cover h-64 w-full relative">
        <View
          style={{
            position: "absolute",
            top: "35%",
            backgroundColor: "#6b728037",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "5%",
          }}
        >
          <TouchableOpacity onPress={handleNextImage}>
            <Ionicons name="arrow-forward" size={24} color="#f9fafb" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            top: "35%",
            backgroundColor: "#6b728037",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <TouchableOpacity onPress={handlePreviousImage}>
            <Ionicons name="arrow-back" size={24} color="#f9fafb" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              left: "50%",
              transform: [{ translateX: -50 }],
              zIndex: 10,
              bottom: 15,
            }}
          >
            {carouselData?.[0].images?.map((_, i) => (
              <View
                key={i}
                className={`bg-iconBgs-green-bg h-2 w-2 ${
                  i == currentIndex && "h-3 w-3"
                } p-1 mx-1 rounded-full`}
              />
            ))}
          </View>
          <Image
            source={{ uri: item }}
            style={{
              marginRight: 0,
              height: 200,
              width: "auto",
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  const getDiseasesData = async () => {
    try {
      const diseaseQuery = query(
        collection(db, "diseases"),
        where("name", "==", disease)
      );
      const diseaseSnapshot = await getDocs(diseaseQuery);
      if (diseaseSnapshot.empty) {
        console.log("No matching disease found");
        return;
      }
      const fetchedDiseases: Disease[] = [];
      for (const doc of diseaseSnapshot.docs) {
        const diseaseData = doc.data();

        // Validate and transform the data if necessary
        if (
          typeof diseaseData.name === "string" &&
          typeof diseaseData.image === "string" &&
          typeof diseaseData.description === "string" &&
          Array.isArray(diseaseData.symptoms)
        ) {
          fetchedDiseases.push(diseaseData as Disease);
        } else {
          console.warn("Invalid disease data structure:", diseaseData);
        }

        // setDiseaseData(diseaseData as Disease[]);
        setDiseaseData(fetchedDiseases);

        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages: Carousel[] = [];
        if (carouselSnapshot.empty) {
          console.log("No matching carousel found");
          return;
        }
        carouselSnapshot.forEach((carouselDoc) => {
          const carouseldata = carouselDoc.data() as Carousel;

          carouselImages.push(carouseldata);
        });
        setCarouselData(carouselImages);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/TtSmNr394bVp9J8n8";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL", url);
    }
  };
  useEffect(() => {
    getDiseasesData();
  }, []);
  // console.log("carouseldata [0] element here", carouselData?.[0]?.images);
  console.log("diseasesdata here", diseaseData?.[0]?.name);

  // Automatically scroll the FlatList
  useEffect(() => {
    if (!carouselData || !carouselData[0]?.images?.length) return;
    const interval = setInterval(() => {
      const carouselLength = carouselData?.[0]?.images.length ?? 0;
      console.log("carouselLength", carouselLength);

      const nextIndex = (currentIndex + 1) % carouselLength; // Loop back to the first image
      console.log("nextIndex", nextIndex);
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex, carouselData]);

  // Skeleton Card Component
  const SkeletonCard = () => {
    const opacity = new Animated.Value(0.3);

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return (
      <Animated.View style={{ opacity }}>
        {/* Image Placeholder */}
        <View className="h-56 w-full bg-gray-300" />

        {/* Text placeholders */}
        <View className="p-2">
          {/* Title */}
          <View className="h-5 bg-gray-300 rounded w-32 mx-2 mt-2" />
          {/* Description line 1 */}
          <View className="h-3 bg-gray-300 rounded w-72 mx-2 mt-2" />
          {/* Description line 2 */}
          <View className="h-3 bg-gray-300 rounded w-64 mx-2 mt-2" />
        </View>
        <View className="p-2">
          {/* Title */}
          <View className="h-5 bg-gray-300 rounded w-32 mx-2 mt-2" />
          {/* Description line 1 */}
          <View className="h-3 bg-gray-300 rounded w-72 mx-2 mt-2" />
          {/* Description line 2 */}
          <View className="h-3 bg-gray-300 rounded w-64 mx-2 mt-2" />
          <View className="h-3 bg-gray-300 rounded w-60 mx-2 mt-2" />
          <View className="h-3 bg-gray-300 rounded w-64 mx-2 mt-2" />
        </View>
      </Animated.View>
    );
  };

  return (
    // <SafeAreaView
    //   style={[
    //     { backgroundColor: "#f7f7fc" },
    //     Platform.OS == "android" && { paddingBottom: 0 },
    //     Platform.OS == "ios" && { paddingBottom: 20 },
    //   ]}
    // >
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <View className="flex-1 ">
        <View style={{ flex: -1 }}>
          <Stack.Screen
            options={{
              headerShown: true,
              title: disease ? `${disease}` : "", // Dynamically set the title
              headerBackTitle: "Back",
              presentation: "card", // or 'modal', 'transparentModal'
              animation: "slide_from_right", // 'fade', 'slide_from_bottom', etc.
              headerStyle: {
                backgroundColor: "#a855f7", // Change the background color of the header
              },
              headerTitleStyle: {
                fontSize: 20, // Change the font size of the title
                fontWeight: "semibold", // Make the title bold
                color: "#F3E8FF", // Change the color of the title
              },
              headerTintColor: "#F3E8FF", // Change the color of the back button
            }}
          />
          <View className=" ">
            {loading ? (
              <View className=" h-screen">
                <SkeletonCard />
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={carouselData?.[0]?.images} // Provide an empty array as a fallback
                renderItem={carouselItem}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>

          <ScrollView
            style={{
              height: 450,
              marginTop: -24,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* <View className="flex-1 flex-row mt-4 mx-2 p-2">
            <Ionicons name="location-sharp" size={24} color="#7C3AED" />
            <Text className="max-w-[75%] text-color4 font-bold">
              {diseaseData?.[0].name} |{"  "}
              <Text
                onPress={handleLocation}
                className="underline flex items-center mt-1 text-color4 italic font-semibold"
              >
                Get Direction
              </Text>
            </Text>
          </View> */}
            {/* <View className="flex-1 mx-2 p-2">
            <Image
              source={{ uri: diseaseData?.[0].image }}
              className="h-56 rounded-[25px]"
              style={{
                height: 120,
                width: 200,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </View> */}
            <View className=" p-2">
              <View>
                <Text className="text-text-dark text-lg font-bold mx-2 mt-2">
                  Description
                </Text>
                <Text className="text-text-medium text-base mx-2 mt-2">
                  {diseaseData?.[0].description}
                </Text>
              </View>
              <View>
                <Text className="text-text-dark text-lg font-bold mx-2 mt-2">
                  Symptoms
                </Text>
                <Text className="text-text-medium text-base mx-2 mt-2">
                  {diseaseData?.[0].symptoms.map((symptom, index) => (
                    <Text
                      key={index}
                      className="text-color1 text-base mx-2 mt-2"
                    >
                      {symptom}
                      {index !== diseaseData[0].symptoms.length - 1 && "\n"}
                    </Text>
                  ))}
                </Text>
              </View>
            </View>
            {/* <View className="flex-1 mx-3 mt-5">
            <DatePickerComponent onConfirm={(date) => setSelectedDate(date)} />
            <Text className="text-lg mt-2 text-color4 mb-4">
              {selectedDate
                ? selectedDate.toLocaleString()
                : "No date selected"}
            </Text>
          </View> */}
          </ScrollView>
        </View>
        {/* </SafeAreaView> */}
      </View>
    </LinearGradient>
  );
};

export default Disease;

// ***************************************************************************************************************
// ***************************************************************************************************************
