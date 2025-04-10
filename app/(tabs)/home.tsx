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
// } from "react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import banner from "../../assets/images/banner.jpg";
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
// import { Stack, useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as NavigationBar from "expo-navigation-bar";

// interface Disease {
//   name: string;
//   image: string;
//   description: string;
//   symptoms: string[]; // Use string[] for an array of strings
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

//   const temp = async () => {
//     const value = await AsyncStorage.getItem("isGuest");
//     const email = await AsyncStorage.getItem("userEmail");
//     console.log(value, email);
//   };

//   const renderItem = ({ item }: { item: Disease }) => (
//     <View className=" flex flex-col max-w-56 max-h-56 justify-center mx-1">
//       <View>
//         <Image
//           resizeMode="cover"
//           source={{ uri: item.image }}
//           className="h-28 rounded-t-xl"
//         />
//       </View>
//       <View className=" p-2 py-1">
//         <View>
//           <Text numberOfLines={1} className="text-color1 text-lg/6 font-medium">
//             {item.name}
//           </Text>
//         </View>
//         <View className=" mt-1 ">
//           <Text numberOfLines={2} className="text-color1 font-normal text-xs">
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
//           <View className=" mt-1 mb-2 w-[45px] h-6 items-center border bg-color1 justify-center content-center rounded-xl">
//             <Text className=" text-color6 rounded-full text-sm">view</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const getDiseases = async () => {
//     const q = query(collection(db, "diseases"));
//     const res = await getDocs(q);

//     const fetchedDiseases = res.docs.map((doc) => doc.data() as Disease); // Cast to Restaurant
//     setDiseases(fetchedDiseases); // Update state
//   };

//   const onRefresh = async () => {
//     setRefreshing(true); // Start the spinner
//     await getDiseases(); // Re-fetch the diseases
//     setRefreshing(false); // Stop the spinner
//   };

//   useEffect(() => {
//     getDiseases();
//     temp();
//   }, []);

//   return (
//     <SafeAreaView
//       style={[
//         { backgroundColor: "#f7f7fc" },
//         Platform.OS == "android" && { paddingBottom: 60 },
//         Platform.OS == "ios" && { paddingBottom: 20 },
//       ]}
//     >
//       <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />

//       <View style={{ flex: -1 }}>
//         {/* <Stack.Screen
//           options={{
//             title: "Details",
//             presentation: "card", // or 'modal', 'transparentModal'
//             animation: "slide_from_right", // 'fade', 'slide_from_bottom', etc.
//             headerShown: true,
//           }}
//         /> */}
//         <View className=" ">
//           <ImageBackground
//             resizeMode="stretch"
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: 210, // or whatever height you need
//               top: 0,
//               left: 0,
//               right: 0,
//               zIndex: 1,
//             }}
//             source={banner}
//           ></ImageBackground>
//         </View>
//         <ScrollView
//           style={{ marginTop: 210 }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="#041421"
//               colors={["#041421"]} // For Android spinner
//             />
//           }
//           contentContainerStyle={{ paddingTop: 5 }}
//           overScrollMode="always"
//           showsVerticalScrollIndicator={false}
//         >
//           <View className="p-4 flex-row items-center">
//             <Text className="text-3xl text-color2 mr-2 font-semibold">
//               Mental Diseases
//             </Text>
//           </View>
//           <View className="flex-row items-center justify-center">
//             {diseases.length > 0 ? (
//               <FlatList
//                 // className=" pt-5 pb-5"
//                 data={diseases}
//                 renderItem={renderItem}
//                 horizontal
//                 contentContainerStyle={{ padding: 2 }}
//                 showsHorizontalScrollIndicator={false}
//                 scrollEnabled={true}
//               />
//             ) : (
//               <ActivityIndicator animating color={"#041421"} />
//             )}
//           </View>

//           <View className="p-4 flex-row items-center">
//             <Text className="text-3xl text-color2 mr-2 font-semibold">
//               Suggest For You
//             </Text>
//           </View>
//           {diseases.length > 0 ? (
//             <FlatList
//               className=" pb-5"
//               data={diseases}
//               renderItem={renderItem}
//               horizontal
//               contentContainerStyle={{ padding: 2 }}
//               showsHorizontalScrollIndicator={false}
//               scrollEnabled={true}
//             />
//           ) : (
//             <ActivityIndicator animating color={"#041421"} />
//           )}
//           <View className="p-4 flex-row items-center">
//             <Text className="text-3xl text-color2 mr-2 font-semibold">
//               Suggest For You
//             </Text>
//           </View>
//           {diseases.length > 0 ? (
//             <FlatList
//               className=" pb-5"
//               data={diseases}
//               renderItem={renderItem}
//               horizontal
//               contentContainerStyle={{ padding: 2 }}
//               showsHorizontalScrollIndicator={false}
//               scrollEnabled={true}
//             />
//           ) : (
//             <ActivityIndicator animating color={"#041421"} />
//           )}
//           <View className="p-4 flex-row items-center">
//             <Text className="text-3xl text-color2 mr-2 font-semibold">
//               Suggest For You
//             </Text>
//           </View>
//           {diseases.length > 0 ? (
//             <FlatList
//               className=" pb-5"
//               data={diseases}
//               renderItem={renderItem}
//               horizontal
//               contentContainerStyle={{ padding: 2 }}
//               showsHorizontalScrollIndicator={false}
//               scrollEnabled={true}
//             />
//           ) : (
//             <ActivityIndicator animating color={"#041421"} />
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

// *************************************** START *****************************************
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
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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

interface Disease {
  name: string;
  image: string;
  description: string;
  symptoms: string[]; // Use string[] for an array of strings
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

  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
  };

  const renderItem = ({ item }: { item: Disease }) => (
    <View className=" flex flex-col max-w-56 max-h-56 justify-center mx-1">
      <View>
        <Image
          resizeMode="cover"
          source={{ uri: item.image }}
          className="h-28 rounded-t-xl"
        />
      </View>
      <View className=" p-2 py-1">
        <View>
          <Text
            numberOfLines={1}
            className="text-text-dark text-lg/6 font-medium"
          >
            {item.name}
          </Text>
        </View>
        <View className=" mt-1 ">
          <Text
            numberOfLines={2}
            className="text-text-medium font-normal text-xs"
          >
            {item.description}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.navigate({
              pathname: "/mentalDisease/[disease]",
              params: { disease: item.name },
            })
          }
        >
          <View className=" mt-1 w-[45px] h-6 items-center border border-purple-500 justify-center content-center rounded-xl">
            <Text className=" text-purple-500 rounded-full text-sm font-bold">
              view
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getDiseases = async () => {
    const q = query(collection(db, "diseases"));
    const res = await getDocs(q);

    const fetchedDiseases = res.docs.map((doc) => doc.data() as Disease); // Cast to Restaurant
    setDiseases(fetchedDiseases); // Update state
  };

  const onRefresh = async () => {
    setRefreshing(true); // Start the spinner
    await getDiseases(); // Re-fetch the diseases
    setRefreshing(false); // Stop the spinner
  };

  useEffect(() => {
    getDiseases();
    temp();
  }, []);

  return (
    // <SafeAreaView
    //   style={[
    //     { backgroundColor: "#f7f7fc" },
    //     Platform.OS == "android" && { paddingBottom: 60 },
    //     Platform.OS == "ios" && { paddingBottom: 20 },
    //   ]}
    // >

    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />
      {/* <Stack.Screen
          options={{
            title: "Details",
            presentation: "card", // or 'modal', 'transparentModal'
            animation: "slide_from_right", // 'fade', 'slide_from_bottom', etc.
            headerShown: true,
          }}
        /> */}
      <View className=" relative" style={{ elevation: 4 }}>
        <ImageBackground
          style={{
            width: "100%",
            height: 190,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            marginBottom: 10,
          }}
          resizeMode="contain"
          source={banner}
        ></ImageBackground>
      </View>

      <ScrollView
        // style={{ marginTop: 210 }}
        className=" px-4 "
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#a855f7"
            colors={["#a855f7"]} // For Android spinner
          />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-2 flex-row items-center">
          <Text className="text-2xl font-semibold text-text-dark mb-3">
            Mental Diseases
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          {diseases.length > 0 ? (
            <FlatList
              // className=" pt-5 pb-5"
              data={diseases}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ padding: 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
            <ActivityIndicator animating color={"#a855f7"} />
          )}
        </View>
        <View className="p-2 flex-row items-center">
          <Text className="text-2xl font-semibold text-text-dark mb-3">
            Mental Diseases
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          {diseases.length > 0 ? (
            <FlatList
              // className=" pt-5 pb-5"
              data={diseases}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ padding: 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
            <ActivityIndicator animating color={"#a855f7"} />
          )}
        </View>
        <View className="p-2 flex-row items-center">
          <Text className="text-2xl font-semibold text-text-dark mb-3">
            Mental Diseases
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          {diseases.length > 0 ? (
            <FlatList
              // className=" pt-5 pb-5"
              data={diseases}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ padding: 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
            <ActivityIndicator animating color={"#a855f7"} />
          )}
        </View>
        <View className="p-2 flex-row items-center">
          <Text className="text-2xl font-semibold text-text-dark mb-3">
            Mental Diseases
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          {diseases.length > 0 ? (
            <FlatList
              // className=" pt-5 pb-5"
              data={diseases}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ padding: 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
            <ActivityIndicator animating color={"#a855f7"} />
          )}
        </View>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default Home;

// ************************************* END *********************************************
