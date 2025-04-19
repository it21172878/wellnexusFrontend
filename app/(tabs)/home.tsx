// import {
//   View,
//   Text,
//   Platform,
//   Image,
//   ScrollView,
//   ImageBackground,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
//   StatusBar,
//   RefreshControl,
//   Animated,
//   Easing,
// } from "react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";
// import banner from "../../assets/images/banner.jpg";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
// import { Stack, useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as NavigationBar from "expo-navigation-bar";
// import { LinearGradient } from "expo-linear-gradient";

// interface Disease {
//   name: string;
//   image: string;
//   description: string;
//   symptoms: string[];
// }

// const Home = () => {
//   useFocusEffect(
//     useCallback(() => {
//       NavigationBar.setBackgroundColorAsync("#a855f7");
//       NavigationBar.setButtonStyleAsync("light");
//     }, [])
//   );

//   const router = useRouter();
//   const [refreshing, setRefreshing] = useState(false);
//   const [diseases, setDiseases] = useState<Disease[]>([]);
//   const insets = useSafeAreaInsets();
//   const [loading, setLoading] = useState(true);

//   const temp = async () => {
//     const value = await AsyncStorage.getItem("isGuest");
//     const email = await AsyncStorage.getItem("userEmail");
//     console.log(value, email);
//   };

//   const renderItem = ({ item }: { item: Disease }) => (
//     <View className=" p-2 mr-2 flex flex-col max-w-56 max-h-56 justify-center bg-gray-50 rounded-2xl shadow-md overflow-hidden">
//       <View>
//         <Image
//           resizeMode="cover"
//           source={{ uri: item.image }}
//           className="h-28 rounded-t-xl"
//         />
//       </View>
//       <View className=" p-2 py-1">
//         <View>
//           <Text
//             numberOfLines={1}
//             className="text-text-dark text-lg/6 font-medium"
//           >
//             {item.name}
//           </Text>
//         </View>
//         <View className=" mt-1 ">
//           <Text
//             numberOfLines={2}
//             className="text-text-medium font-normal text-xs"
//           >
//             {item.description}
//           </Text>
//         </View>
//         <TouchableOpacity
//           onPress={() =>
//             router.navigate({
//               pathname: "/mentalDisease/[disease]",
//               params: { disease: item.name },
//             })
//           }
//         >
//           <View className=" mt-1 w-[45px] h-6 items-center border border-purple-500 justify-center content-center rounded-xl">
//             <Text className=" text-purple-500 rounded-full text-sm font-bold">
//               view
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const getDiseases = async () => {
//     try {
//       setLoading(true);
//       const q = query(collection(db, "diseases"));
//       const res = await getDocs(q);
//       const fetchedDiseases = res.docs.map((doc) => doc.data() as Disease);
//       setDiseases(fetchedDiseases);
//     } catch (error) {
//       console.error("Error fetching diseases:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await getDiseases();
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     getDiseases();
//     temp();
//   }, []);

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
//     <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
//       <View className="flex-1">
//         <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />

//         <View className=" relative" style={{ elevation: 4 }}>
//           <ImageBackground
//             style={{
//               width: "100%",
//               height: 190,
//               top: 0,
//               left: 0,
//               right: 0,
//               zIndex: 1,
//               marginBottom: 10,
//             }}
//             resizeMode="contain"
//             source={banner}
//           ></ImageBackground>
//         </View>

//         <ScrollView
//           className=" px-4 "
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="#a855f7"
//               colors={["#a855f7"]}
//             />
//           }
//           contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
//           overScrollMode="always"
//           showsVerticalScrollIndicator={false}
//         >
//           <View className=" flex-row items-center">
//             <Text className="text-2xl font-semibold text-text-dark mb-3">
//               Mental Diseases
//             </Text>
//           </View>

//           <View className="flex-row items-center justify-center pb-5">
//             {loading ? (
//               <View className="">
//                 <FlatList
//                   data={[...Array(5)]} // Placeholder for 5 skeleton cards
//                   renderItem={() => <SkeletonCard />}
//                   horizontal
//                   contentContainerStyle={{ padding: 2 }}
//                   showsHorizontalScrollIndicator={false}
//                   scrollEnabled={true}
//                 />
//                 {/* {[...Array(55)].map((_, index) => (
//                 <SkeletonCard key={index} />
//               ))} */}
//               </View>
//             ) : (
//               <FlatList
//                 data={diseases}
//                 renderItem={renderItem}
//                 horizontal
//                 contentContainerStyle={{ padding: 2 }}
//                 showsHorizontalScrollIndicator={false}
//                 scrollEnabled={true}
//               />
//             )}
//           </View>
//           <View className="flex-row items-center justify-center">
//             {loading ? (
//               <View className="">
//                 <FlatList
//                   data={[...Array(5)]} // Placeholder for 5 skeleton cards
//                   renderItem={() => <SkeletonCard />}
//                   horizontal
//                   contentContainerStyle={{ padding: 2 }}
//                   showsHorizontalScrollIndicator={false}
//                   scrollEnabled={true}
//                 />
//                 {/* {[...Array(55)].map((_, index) => (
//                 <SkeletonCard key={index} />
//               ))} */}
//               </View>
//             ) : (
//               <FlatList
//                 data={diseases}
//                 renderItem={renderItem}
//                 horizontal
//                 contentContainerStyle={{ padding: 2 }}
//                 showsHorizontalScrollIndicator={false}
//                 scrollEnabled={true}
//               />
//             )}
//           </View>
//           <View className="flex-row items-center justify-center">
//             {loading ? (
//               <View className="">
//                 <FlatList
//                   data={[...Array(5)]} // Placeholder for 5 skeleton cards
//                   renderItem={() => <SkeletonCard />}
//                   horizontal
//                   contentContainerStyle={{ padding: 2 }}
//                   showsHorizontalScrollIndicator={false}
//                   scrollEnabled={true}
//                 />
//                 {/* {[...Array(55)].map((_, index) => (
//                 <SkeletonCard key={index} />
//               ))} */}
//               </View>
//             ) : (
//               <FlatList
//                 data={diseases}
//                 renderItem={renderItem}
//                 horizontal
//                 contentContainerStyle={{ padding: 2 }}
//                 showsHorizontalScrollIndicator={false}
//                 scrollEnabled={true}
//               />
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </LinearGradient>
//   );
// };

// export default Home;

// //////////////////////////////////////
// // //////////////////////////////////////
import {
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import banner from "../../assets/images/banner.jpg";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Disease {
  name: string;
  image: string;
  description: string;
  symptoms: string[];
}

const Home = () => {
  useFocusEffect(
    useCallback(() => {
      NavigationBar.setBackgroundColorAsync("#a855f7");
      NavigationBar.setButtonStyleAsync("light");
    }, [])
  );

  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [190, 120],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
  };

  const renderItem = ({ item, index }: { item: Disease; index: number }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, 150 * index, 150 * (index + 2)],
      outputRange: [1, 1, 1, 0.9],
    });

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <View className="pb-1 mx-2 flex flex-col w-64 justify-center bg-white rounded-2xl shadow-lg overflow-hidden">
          <View className="rounded-xl">
            {/* <View className="rounded-xl overflow-hidden"> */}
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              className="h-32 w-full rounded-t-xl"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              className="absolute bottom-0 left-0 right-0 h-16"
            />
            <Text className="absolute bottom-3 left-3 text-white text-lg font-bold">
              {item.name}
            </Text>
          </View>
          <View className="p-2 py-3">
            <Text
              numberOfLines={2}
              className="text-gray-600 font-normal text-sm mb-3"
            >
              {item.description}
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons name="info" size={16} color="#6d28d9" />
                <Text className="text-purple-700 text-xs ml-1">
                  {item.symptoms.length} symptoms
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  router.navigate({
                    pathname: "/mentalDisease/[disease]",
                    params: { disease: item.name },
                  })
                }
              >
                <View className="px-3 py-1 bg-purple-100 rounded-full">
                  <Text className="text-purple-700 text-xs font-medium">
                    Learn More
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const getDiseases = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "diseases"));
      const res = await getDocs(q);
      const fetchedDiseases = res.docs.map((doc) => doc.data() as Disease);
      setDiseases(fetchedDiseases);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getDiseases();
    setRefreshing(false);
  };

  useEffect(() => {
    getDiseases();
    temp();
  }, []);

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
      <Animated.View
        style={{ opacity }}
        className="pb-1 mx-2 w-64 bg-white rounded-2xl overflow-hidden"
      >
        <View className="h-32 w-full bg-gray-300 rounded-t-xl" />
        <View className="p-2 py-3 mt-2">
          {/* <View className="h-5 bg-gray-300 rounded w-3/4 mb-2" /> */}
          <View className="h-3 bg-gray-300 rounded w-full mb-2" />
          <View className="h-3 bg-gray-300 rounded w-5/6 mb-3" />
          <View className="flex-row justify-between">
            <View className="h-4 bg-gray-300 rounded w-16" />
            <View className="h-6 bg-gray-300 rounded-full w-20" />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={["#f9fafb", "#f3f4f6"]} className="flex-1">
      <View className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />

        <Animated.View
          className="relative z-10"
          style={{
            height: headerHeight,
            opacity: headerOpacity,
          }}
        >
          <ImageBackground
            source={banner}
            resizeMode="cover"
            className="w-full h-full"
          >
            <LinearGradient
              colors={["rgba(109, 40, 217, 0.8)", "rgba(109, 40, 217, 0.4)"]}
              className="absolute inset-0"
            />
            <View className="absolute bottom-6 left-6">
              <Text className="text-white text-2xl font-bold">
                Mental Wellness
              </Text>
              <Text className="text-white text-sm mt-1">
                Explore and understand mental health conditions
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          className="px-2"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6d28d9"
              colors={["#6d28d9"]}
            />
          }
          contentContainerStyle={{
            paddingBottom: insets.bottom + 80,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">
                Mental Conditions
              </Text>
              <TouchableOpacity>
                <Text className="text-purple-700 text-sm font-medium">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <FlatList
                data={[...Array(5)]}
                renderItem={() => <SkeletonCard />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
              />
            ) : (
              <FlatList
                data={diseases}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
                keyExtractor={(item) => item.name}
              />
            )}
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">
                Common Symptoms
              </Text>
              <TouchableOpacity>
                <Text className="text-purple-700 text-sm font-medium">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {[
                "Anxiety",
                "Depression",
                "Mood Swings",
                "Insomnia",
                "Fatigue",
                "Irritability",
              ].map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] bg-white p-4 rounded-xl shadow-sm mb-3"
                >
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-2">
                      <MaterialIcons name="warning" size={16} color="#6d28d9" />
                    </View>
                    <Text className="text-gray-800 font-medium">{symptom}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Quick Self-Assessment
            </Text>
            <Text className="text-gray-600 mb-4">
              Take a short quiz to understand your current mental state and get
              personalized recommendations.
            </Text>
            <TouchableOpacity className="bg-purple-600 py-3 rounded-xl items-center">
              <Text className="text-white font-bold">Start Assessment</Text>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Home;
// // //////////////////////////////////////
// // //////////////////////////////////////
