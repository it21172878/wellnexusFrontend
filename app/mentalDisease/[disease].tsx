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
//   Modal,
//   ImageBackground,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { useLocalSearchParams } from "expo-router";
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
//   const [date, setDate] = useState(new Date());

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
//       <View style={{ width: windowWidth - 2 }} className="h-64 relative">
//         <View
//           style={{
//             position: "absolute",
//             top: "35%",
//             backgroundColor: "rgba(14, 22, 9,0.5)",
//             borderRadius: 50,
//             padding: 5,
//             zIndex: 10,
//             right: "6%",
//           }}
//         >
//           <TouchableOpacity onPress={handleNextImage}>
//             <Ionicons name="arrow-forward" size={24} color="#A0A899" />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             position: "absolute",
//             top: "35%",
//             backgroundColor: "rgba(14, 22, 9,0.5)",
//             borderRadius: 50,
//             padding: 5,
//             zIndex: 10,
//             left: "2%",
//           }}
//         >
//           <TouchableOpacity onPress={handlePreviousImage}>
//             <Ionicons name="arrow-back" size={24} color="#A0A899" />
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
//                 className={`bg-color5 h-2 w-2 ${
//                   i == currentIndex && "h-3 w-3"
//                 } p-1 mx-1 rounded-full`}
//               />
//             ))}
//           </View>
//           <Image
//             source={{ uri: item }}
//             style={{
//               // opacity: 0.8,
//               // backgroundColor: "black",
//               marginRight: 20,
//               marginLeft: 5,
//               borderRadius: 10,
//             }}
//             className="h-56 rounded-[25px]"
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

//   return (
//     <SafeAreaView
//       style={[
//         { backgroundColor: "#A0A899" },
//         Platform.OS == "android" && { paddingBottom: 0 },
//         Platform.OS == "ios" && { paddingBottom: 20 },
//       ]}
//     >
//       <ScrollView stickyHeaderIndices={[0]}>
//         <View>
//           <View className=" my-2 p-2">
//             <Text className=" text-xl text-color1 mr-2 font-semibold">
//               {disease}
//             </Text>
//             <View className="border-b border-color1" />
//           </View>
//           <View className=" bg-color5 h-60 items-center justify-center w-[98%] mx-2 rounded-[25px]">
//             <FlatList
//               ref={flatListRef}
//               data={carouselData?.[0]?.images} // Provide an empty array as a fallback
//               renderItem={carouselItem}
//               horizontal
//               scrollEnabled={false}
//               showsHorizontalScrollIndicator={false}
//               // style={{ borderRadius: 25 }}
//             />
//           </View>
//         </View>

//         <View className="flex-1 flex-row mt-4 mx-2 p-2">
//           <Ionicons name="location-sharp" size={24} color="#2E462B" />
//           <Text className="max-w-[75%] text-color1">
//             {diseaseData?.[0].name} |{"  "}
//             <Text
//               onPress={handleLocation}
//               className="underline flex items-center mt-1 text-color3 italic font-semibold"
//             >
//               Get Direction
//             </Text>
//           </Text>
//         </View>
//         <View className="flex-1 mx-2 p-2">
//           <Image
//             source={{ uri: diseaseData?.[0].image }}
//             className="h-56 rounded-[25px]"
//             style={{
//               height: 120,
//               width: 200,
//               // opacity: 0.8,
//               // backgroundColor: "black",
//               // marginRight: 20,
//               // marginLeft: 5,
//               borderRadius: 10,
//             }}
//             resizeMode="cover"
//           />
//         </View>
//         <View className=" p-2">
//           <View>
//             <Text className="text-color1 text-lg font-semibold mx-2 mt-2">
//               description
//             </Text>
//             <Text className="text-color3 text-base mx-2 mt-2">
//               {diseaseData?.[0].description}
//             </Text>
//           </View>
//           <View>
//             <Text className="text-color1 text-lg font-semibold mx-2 mt-2">
//               symptoms
//             </Text>
//             <Text className="text-color3 text-base mx-2 mt-2">
//               {diseaseData?.[0].symptoms.map((symptom, index) => (
//                 <Text key={index} className="text-color3 text-base mx-2 mt-2">
//                   {symptom}
//                   {index !== diseaseData[0].symptoms.length - 1 && "\n"}
//                 </Text>
//               ))}
//             </Text>
//           </View>
//         </View>
//         <View className="flex-1 mx-3 mt-5">
//           <DatePickerComponent onConfirm={(date) => setSelectedDate(date)} />
//           <Text className="text-lg mb-4 mt-2 text-color1 ">
//             {selectedDate ? selectedDate.toLocaleString() : "No date selected"}
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Disease;

// ================================================================================================================================
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
  Modal,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import DatePickerComponent from "@/components/diseases/DatePickerComponent";
import * as NavigationBar from "expo-navigation-bar";

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
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "35%",
            backgroundColor: "rgba(14, 22, 9,0.5)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <TouchableOpacity onPress={handleNextImage}>
            <Ionicons name="arrow-forward" size={24} color="#f7f7fc" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            top: "35%",
            backgroundColor: "rgba(14, 22, 9,0.5)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <TouchableOpacity onPress={handlePreviousImage}>
            <Ionicons name="arrow-back" size={24} color="#f7f7fc" />
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
                className={`bg-color6 h-2 w-2 ${
                  i == currentIndex && "h-3 w-3"
                } p-1 mx-1 rounded-full`}
              />
            ))}
          </View>
          <Image
            source={{ uri: item }}
            style={{
              // opacity: 0.8,
              // backgroundColor: "black",
              marginRight: 20,
              marginLeft: 5,
              borderRadius: 10,
            }}
            className="h-56 rounded-[25px]"
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

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 55 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View style={{ flex: -1 }}>
        <View className=" my-2 p-2">
          <Text className=" text-xl text-color4 mr-2 font-semibold">
            {disease}
          </Text>
          <View className="border-b border-color4" />
        </View>
        <View className=" h-60 items-center justify-center w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData?.[0]?.images} // Provide an empty array as a fallback
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            // style={{ borderRadius: 25 }}
          />
        </View>

        <ScrollView
          style={{
            // opacity: 0.8,
            // backgroundColor: "black",
            height: 450,
            marginTop: -10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 flex-row mt-4 mx-2 p-2">
            <Ionicons name="location-sharp" size={24} color="#c78441" />
            <Text className="max-w-[75%] text-color4 font-bold">
              {diseaseData?.[0].name} |{"  "}
              <Text
                onPress={handleLocation}
                className="underline flex items-center mt-1 text-color4 italic font-semibold"
              >
                Get Direction
              </Text>
            </Text>
          </View>
          <View className="flex-1 mx-2 p-2">
            <Image
              source={{ uri: diseaseData?.[0].image }}
              className="h-56 rounded-[25px]"
              style={{
                height: 120,
                width: 200,
                // opacity: 0.8,
                // backgroundColor: "black",
                // marginRight: 20,
                // marginLeft: 5,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </View>
          <View className=" p-2">
            <View>
              <Text className="text-color4 text-lg font-bold mx-2 mt-2">
                Description
              </Text>
              <Text className="text-color1 text-base mx-2 mt-2">
                {diseaseData?.[0].description}
              </Text>
            </View>
            <View>
              <Text className="text-color4 text-lg font-bold mx-2 mt-2">
                Symptoms
              </Text>
              <Text className="text-color3 text-base mx-2 mt-2">
                {diseaseData?.[0].symptoms.map((symptom, index) => (
                  <Text key={index} className="text-color1 text-base mx-2 mt-2">
                    {symptom}
                    {index !== diseaseData[0].symptoms.length - 1 && "\n"}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
          <View className="flex-1 mx-3 mt-5">
            <DatePickerComponent onConfirm={(date) => setSelectedDate(date)} />
            <Text className="text-lg mt-2 text-color4 mb-4">
              {selectedDate
                ? selectedDate.toLocaleString()
                : "No date selected"}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Disease;
// ================================================================================================================================
