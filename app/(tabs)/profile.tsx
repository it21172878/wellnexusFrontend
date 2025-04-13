// import {
//   View,
//   Text,
//   Alert,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { getAuth, signOut } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Profile = () => {
//   const router = useRouter();
//   const auth = getAuth();
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       const email = await AsyncStorage.getItem("userEmail");
//       setUserEmail(email);
//     };

//     fetchUserEmail();
//   }, []);
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       await AsyncStorage.removeItem("userEmail");
//       setUserEmail(null);

//       Alert.alert("Logged out", "You have been logged out successfully.", [
//         { text: "OK", onPress: () => router.push("/signin") },
//       ]);
//       // setTimeout(() => {
//       //   router.push("/signin");
//       // }, 2000); // Redirect after 2 seconds
//       // // router.push("/signin");
//     } catch (error) {
//       Alert.alert("Logged Error", "Error while logging out");
//     }
//   };
//   const handleSignin = () => {
//     router.push("/signin");
//   };

//   return (
//     <SafeAreaView
//       style={[
//         { backgroundColor: "#f7f7fc" },
//         Platform.OS == "android" && { paddingBottom: 0 },
//         Platform.OS == "ios" && { paddingBottom: 20 },
//       ]}
//     >
//       <ScrollView
//         style={{
//           backgroundColor: "#f7f7fc",
//           height: "100%",
//         }}
//       >
//         <View className="flex-1 justify-center items-center mt-10">
//           {userEmail ? (
//             <>
//               <Text className="text-3xl text-color1 font-semibold mb-4">
//                 Welcome To Your Profile
//               </Text>
//               <Text className="text-color2 text-lg mb-6">
//                 Email: {userEmail}
//               </Text>
//               <TouchableOpacity
//                 onPress={handleLogout}
//                 className=" bg-color2 rounded-lg p-2 my-3 mx-2"
//               >
//                 <Text className="text-lg font-semibold text-center text-color6">
//                   Logout
//                 </Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <Text className="text-3xl text-color3 font-semibold mb-4">
//                 Oops!
//               </Text>
//               <Text className="text-xl text-color1 font-semibold mb-4">
//                 To Achive This You Must Login
//               </Text>
//               <TouchableOpacity
//                 onPress={handleSignin}
//                 className="p-2 my-2 bg-color2 rounded-lg mt-10"
//               >
//                 <Text className="text-lg font-semibold text-center text-color6">
//                   Log In
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// ************************************ START ************************************
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      console.log("Fetched userEmail:", email); // Debugging
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  // Mock data
  const user = {
    name: "Alex Johnson",
    bio: "Focusing on my mental wellbeing",
    avatar:
      "https://www.dpliyanagama.me/static/media/avatar.76b57038fed809d1b6a5.jpg",
    moodLevel: 72,
    sessions: 12,
    meditation: 645,
    streak: 7,
  };

  const activities: Array<{
    id: number;
    name: string;
    type: string;
    duration: string;
    icon: "mediation" | "chat" | "wind-power";
  }> = [
    {
      id: 1,
      name: "Morning Meditation",
      type: "meditation",
      duration: "15 min",
      icon: "mediation",
    },
    {
      id: 2,
      name: "Therapy Session",
      type: "therapy",
      duration: "45 min",
      icon: "chat",
    },
    {
      id: 3,
      name: "Breathing Exercise",
      type: "exercise",
      duration: "5 min",
      icon: "wind-power",
    },
  ];

  const resources = [
    { id: 1, title: "Anxiety Relief", category: "Guided Audio" },
    { id: 2, title: "Sleep Stories", category: "Audio Collection" },
    { id: 3, title: "Mindful Walking", category: "Exercise" },
  ];
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      // setUserEmail(null);

      Alert.alert("Log Out", "Are you sure!", [
        {
          text: "OK",
          onPress: () => {
            setUserEmail(null);
            router.push("/signin");
          },
        },
        { text: "CANCEL", style: "cancel" },
      ]);
      // setTimeout(() => {
      //   router.push("/signin");
      // }, 2000); // Redirect after 2 seconds
      // // router.push("/signin");
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* <StatusBar style="light" /> */}
      <StatusBar barStyle="light-content" backgroundColor={"#a855f7"} />

      {/* Header */}
      <View className="relative">
        <View className="bg-purple-500 h-40 rounded-b-3xl">
          <View className="rounded-b-3xl flex-row justify-end">
            {userEmail ? (
              <TouchableOpacity
                onPress={handleLogout}
                className="mt-16 px-4"
                testID="logout-button"
              >
                <View className=" flex-row items-center justify-center">
                  <Text className="text-lg font-bold text-white mr-2">
                    Log Out
                  </Text>
                  <MaterialCommunityIcons
                    name="logout"
                    size={22}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => router.push("/signin")}
                className="mt-16 px-4"
                testID="login-button"
              >
                <View className=" flex-row items-center justify-center">
                  <Text className="text-lg font-thin text-white mr-2">
                    Log In
                  </Text>
                  <MaterialCommunityIcons name="login" size={22} color="#fff" />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View
            className="absolute -bottom-12 left-4 right-4 bg-white rounded-xl shadow-lg p-4 flex-row items-end"
            style={{ elevation: 4 }}
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-20 h-20 rounded-full border-4 border-white -mt-14"
            />
            <View className="ml-4 mb-1">
              <Text className="text-xl font-bold text-gray-800">
                {user.name}
              </Text>
              <Text className="text-gray-500">{user.bio}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        className="mt-16 px-4"
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Status Card */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6 items-center">
          <View className="relative items-center justify-center mb-4">
            <View className="w-40 h-40 rounded-full border-8 border-purple-100 items-center justify-center">
              <Text className="text-3xl font-bold text-purple-600">
                {user.moodLevel}%
              </Text>
              <Text className="text-gray-500 mt-1">Mental Wellbeing</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold text-gray-700">
            You're doing great!
          </Text>
          <Text className="text-gray-500 text-center mt-1">
            Your mood has improved by 15% compared to last week
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-xl flex-1 mr-2 items-center shadow-sm">
            <View className="bg-blue-100 p-3 rounded-full mb-2">
              <Feather name="activity" size={20} color="#4f46e5" />
            </View>
            <Text className="font-bold text-gray-800">{user.sessions}</Text>
            <Text className="text-gray-500 text-xs">Sessions</Text>
          </View>

          <View className="bg-white p-4 rounded-xl flex-1 mx-2 items-center shadow-sm">
            <View className="bg-purple-100 p-3 rounded-full mb-2">
              <Ionicons name="time-outline" size={20} color="#7c3aed" />
            </View>
            <Text className="font-bold text-gray-800">{user.meditation}</Text>
            <Text className="text-gray-500 text-xs">Meditation mins</Text>
          </View>

          <View className="bg-white p-4 rounded-xl flex-1 ml-2 items-center shadow-sm">
            <View className="bg-green-100 p-3 rounded-full mb-2">
              <MaterialIcons name="whatshot" size={20} color="#10b981" />
            </View>
            <Text className="font-bold text-gray-800">{user.streak}</Text>
            <Text className="text-gray-500 text-xs">Day streak</Text>
          </View>
        </View>

        {/* Recent Activities */}
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Recent Activities
        </Text>
        <View className="mb-6">
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              className="bg-white p-4 rounded-xl mb-3 flex-row items-center shadow-sm"
            >
              <View className="bg-blue-100 p-3 rounded-full mr-4">
                <MaterialIcons name={activity.icon} size={20} color="#4f46e5" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">
                  {activity.name}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {activity.duration}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Resources for You
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              className="bg-white p-4 rounded-xl mr-3 w-48 shadow-sm"
            >
              <View className="bg-purple-500 h-32 rounded-lg mb-3" />
              <Text className="font-semibold text-gray-800">
                {resource.title}
              </Text>
              <Text className="text-gray-500 text-sm">{resource.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex-row justify-around py-3">
        <TouchableOpacity className="items-center">
          <Feather name="home" size={24} color="#4f46e5" />
          <Text className="text-purple-600 text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Feather name="activity" size={24} color="#9ca3af" />
          <Text className="text-gray-500 text-xs mt-1">Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Feather name="bookmark" size={24} color="#9ca3af" />
          <Text className="text-gray-500 text-xs mt-1">Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Feather name="user" size={24} color="#9ca3af" />
          <Text className="text-gray-500 text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProfileScreen;
// ************************************ END **************************************
