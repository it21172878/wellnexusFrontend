// import {
//   Image,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import "../global.css";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useFocusEffect, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCallback, useEffect, useState } from "react";
// import * as NavigationBar from "expo-navigation-bar";

// export default function Index() {
//   useFocusEffect(
//     useCallback(() => {
//       // Set nav bar color when this screen is focused
//       NavigationBar.setBackgroundColorAsync("#201a24");
//       NavigationBar.setButtonStyleAsync("light");

//       // return () => {
//       //   // Optional: Reset when leaving the screen
//       //   NavigationBar.setBackgroundColorAsync("#A0A899");
//       //   NavigationBar.setButtonStyleAsync("light");
//       // };
//     }, [])
//   );
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       const email = await AsyncStorage.getItem("userEmail");
//       setUserEmail(email);
//     };

//     fetchUserEmail();
//   }, []);
//   const router = useRouter();
//   const handleGuest = async () => {
//     await AsyncStorage.setItem("isGuest", "true");
//     router.push("/home");
//   };

//   return (
//     // <LinearGradient
//     //   // colors={["#0E1609", "#1D2C20","#2E462B","#5C6D5E","#A0A899"]}
//     //   colors={["#302637", "#879f92"]}
//     //   start={{ x: 0, y: 0 }}
//     //   end={{ x: 1, y: 1 }}
//     //   locations={[0.2, 0.6, 0.8]}
//     // >
//     <SafeAreaView style={{ backgroundColor: "#f7f7fc" }}>
//       <StatusBar barStyle="light-content" backgroundColor={"#201a24"} />
//       {/* <View className="flex w-[100px] h-[100px] bg-blue-500 rounded-full opacity-40 justify-center items-center" /> */}
//       <View>
//         <View className="absolute w-[450px] h-[450px] bg-color1 rounded-full -top-9 left-1/2 opacity-15 -translate-x-1/2 -translate-y-1/2" />
//         <View className="absolute w-[450px] h-[450px] bg-color1 rounded-full -top-9 left-[410px] opacity-10 -translate-x-1/2 -translate-y-1/2" />
//       </View>
//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className=" py-16 p-5 flex items-center h-full">
//           {/* <Image source={logo} className=" w-full h-[150px]" /> */}
//           <Text className="font-extrabold text-[65px] mt-36">
//             <Text className=" text-color3 font-extrabold">well</Text>
//             <Text className=" text-color1 font-extrabold">neXus</Text>
//           </Text>

//           <View className=" w-full flex items-center -mt-10">
//             <TouchableOpacity
//               onPress={() => router.navigate("/signup")}
//               className=" bg-color1 border border-color1 p-3 rounded-lg w-full mt-72 text-center items-center "
//             >
//               <Text className=" text-xl font-semibold text-color6">
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={handleGuest}
//               className=" border border-color1 p-3 rounded-lg w-full mt-2 text-center items-center "
//             >
//               <Text className=" text-xl font-semibold text-color1">
//                 Guest User
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <Text className="text-center text-base  font-semibold my-4 text-color3">
//               <View className="border-b-2 border-color1 p-2 mb-1 w-24" /> or{" "}
//               <View className="border-b-2 border-color1 p-2 mb-1 w-24" />
//             </Text>

//             <TouchableOpacity
//               className="flex flex-row justify-center items-center"
//               // onPress={() => router.push("/signin")}
//             >
//               <Text className="text-color1 font-semibold">
//                 Already a User?{" "}
//               </Text>
//               <Text className="text-base font-semibold underline text-color3">
//                 Sign in
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>

//     // </LinearGradient>
//   );
// }

// ******************************************** START **************************************************
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function Index() {
  const router = useRouter();
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };
  useFocusEffect(
    useCallback(() => {
      // Set nav bar color when this screen is focused
      NavigationBar.setBackgroundColorAsync("#a855f7");
      NavigationBar.setButtonStyleAsync("light");

      // return () => {
      //   // Optional: Reset when leaving the screen
      //   NavigationBar.setBackgroundColorAsync("#A0A899");
      //   NavigationBar.setButtonStyleAsync("light");
      // };
    }, [])
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
      // Navigate to home if userEmail is not found
      if (email) {
        router.push("/home");
      }
    };

    fetchUserEmail();
  }, []);

  return (
    // <LinearGradient
    //   // colors={["#0E1609", "#1D2C20","#2E462B","#5C6D5E","#A0A899"]}
    //   colors={["#302637", "#879f92"]}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   locations={[0.2, 0.6, 0.8]}
    // >
    <SafeAreaView style={{ backgroundColor: "#F9FAFB" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />
      {/* <View className="flex w-[100px] h-[100px] bg-blue-500 rounded-full opacity-40 justify-center items-center" /> */}
      <View>
        <View className="absolute w-[450px] h-[450px] bg-purple-500 rounded-full -top-9 left-1/2 opacity-15 -translate-x-1/2 -translate-y-1/2" />
        <View className="absolute w-[450px] h-[450px] bg-purple-600 rounded-full -top-9 left-[410px] opacity-10 -translate-x-1/2 -translate-y-1/2" />
      </View>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" py-16 p-5 flex items-center h-full">
          {/* <Image source={logo} className=" w-full h-[150px]" /> */}
          <Text className="font-extrabold text-[65px] mt-36">
            <Text className=" text-purple-500 font-extrabold">well</Text>
            <Text className=" text-purple-950 font-extrabold">neXus</Text>
          </Text>

          <View className=" w-full flex items-center -mt-10">
            <TouchableOpacity
              onPress={() => router.navigate("/signup")}
              className=" bg-purple-500 border border-purple-500 p-3 rounded-lg w-full mt-72 text-center items-center "
            >
              <Text className=" text-xl font-semibold text-background-light">
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGuest}
              className=" border border-purple-500 p-3 rounded-lg w-full mt-2 text-center items-center "
            >
              <Text className=" text-xl font-semibold text-purple-500">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base  font-semibold my-4 text-text-medium">
              <View className="border-b-2 border-purple-500 p-2 mb-1 w-24" /> or{" "}
              <View className="border-b-2 border-purple-500 p-2 mb-1 w-24" />
            </Text>

            <TouchableOpacity
              className="flex flex-row justify-center items-center"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-text-medium font-semibold">
                Already a User?{" "}
              </Text>
              <Text className="text-base font-semibold underline text-text-dark">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

    // </LinearGradient>
  );
}

// ******************************************** END ****************************************************
