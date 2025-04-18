// import {
//   View,
//   Text,
//   Alert,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
//   RefreshControl,
//   Animated,
//   Easing,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { getAuth, signOut } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import FindDoctor from "./../../components/diseases/FindDoctor";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// interface Channel {
//   id?: string;
//   date: string;
//   email: string;
//   fullName: string;
//   phoneNumber: string;
//   status?: "confirmed" | "pending" | "cancelled";
// }

// const DocChannel = () => {
//   const [date, setDate] = useState<Date>(new Date());
//   const { disease } = useLocalSearchParams<{ disease: string }>();
//   const [channelDetails, setChannelDetails] = useState<Channel[]>([]);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   const router = useRouter();
//   const auth = getAuth();
//   const [userEmail, setUserEmail] = useState<string | null>(null);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await getChannellingDetails();
//     setRefreshing(false);
//   };

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
//     } catch (error) {
//       Alert.alert("Logged Error", "Error while logging out");
//     }
//   };

//   const getChannellingDetails = async () => {
//     try {
//       setLoading(true);
//       if (!userEmail) return;

//       const channelsQuery = query(
//         collection(db, "channels"),
//         where("email", "==", userEmail)
//       );
//       const channelSnapshot = await getDocs(channelsQuery);

//       if (channelSnapshot.empty) {
//         setChannelDetails([]);
//         setLoading(false);
//         return;
//       }

//       const fetchedChannels: Channel[] = channelSnapshot.docs.map(
//         (doc) =>
//           ({
//             id: doc.id,
//             ...doc.data(),
//           } as Channel)
//       );

//       setChannelDetails(fetchedChannels);
//     } catch (error) {
//       console.error("Error fetching data", error);
//       Alert.alert("Error", "Failed to load channel details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       getChannellingDetails();
//     }
//   }, [userEmail]);

//   const handleSignup = () => {
//     router.push("/signup");
//   };

//   const formatDate = (dateString: string) => {
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }).format(new Date(dateString));
//   };

//   const getStatusStyle = (status: Channel["status"] = "confirmed") => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-blue-100 text-blue-800";
//     }
//   };

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
//       // Array.from({ length: 3 }).map((_, index) => (
//       <Animated.View style={{ opacity }}>
//         {Array.from({ length: channelDetails.length }).map((_, index) => (
//           <View
//             key={index}
//             className="bg-white rounded-xl p-4 mb-4 shadow-sm shadow-gray-300"
//           >
//             {/* Date Skeleton */}
//             <View className="flex-row items-center border-b border-gray-100 pb-3 mb-3">
//               <View className="w-6 h-6 bg-gray-200 rounded-full" />
//               <View className="ml-2 w-32 h-6 bg-gray-200 rounded" />
//             </View>

//             {/* Patient Name Skeleton */}
//             <View className="mb-3">
//               <View className="w-20 h-4 bg-gray-200 rounded" />
//               <View className="w-40 h-5 bg-gray-200 rounded mt-2" />
//             </View>

//             {/* Contact Number Skeleton */}
//             <View className="mb-3">
//               <View className="w-24 h-4 bg-gray-200 rounded" />
//               <View className="w-32 h-5 bg-gray-200 rounded mt-2" />
//             </View>

//             {/* Status Skeleton */}
//             <View className="flex-row justify-end mt-2">
//               <View className="w-20 h-6 bg-gray-200 rounded-full" />
//             </View>
//           </View>
//         ))}
//       </Animated.View>
//     );
//   };

//   return (
//     <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
//       <SafeAreaView
//         style={[
//           Platform.OS == "android" && { paddingBottom: 60 },
//           Platform.OS == "ios" && { paddingBottom: 20 },
//         ]}
//         className=" flex-1"
//       >
//         <View className="flex-1 px-4">
//           {/* Header */}
//           <View className="my-4">
//             <Text className="text-2xl font-bold text-text-dark">
//               Your Appointments
//             </Text>
//           </View>

//           {/* Content */}

//           <ScrollView
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#4a90e2"
//                 colors={["#4a90e2"]}
//               />
//             }
//             showsVerticalScrollIndicator={false}
//           >
//             {userEmail ? (
//               <View className="pb-5 mt-5">
//                 {loading ? (
//                   <SkeletonCard />
//                 ) : channelDetails.length === 0 ? (
//                   <View className="items-center justify-center p-10 bg-white/70 rounded-xl my-4">
//                     <MaterialIcons name="event-busy" size={40} color="#888" />
//                     <Text className="mt-3 text-lg font-medium text-gray-600">
//                       No appointments found
//                     </Text>
//                     <Text className="mt-1 text-gray-500">
//                       Book your first appointment below
//                     </Text>
//                   </View>
//                 ) : (
//                   channelDetails.map((item) => (
//                     <View
//                       key={item.id}
//                       className="bg-white rounded-xl p-4 mb-4 shadow-sm shadow-gray-300"
//                     >
//                       <View className="flex-row items-center border-b border-gray-100 pb-3 mb-3">
//                         <MaterialIcons name="event" size={24} color="#4a90e2" />
//                         <Text className="ml-2 text-lg font-semibold text-gray-800">
//                           {formatDate(item.date)}
//                         </Text>
//                       </View>

//                       <View className="mb-3">
//                         <Text className="text-sm text-gray-500">
//                           Patient Name
//                         </Text>
//                         <Text className="text-base font-medium text-gray-800 mt-1">
//                           {item.fullName}
//                         </Text>
//                       </View>

//                       <View className="mb-3">
//                         <Text className="text-sm text-gray-500">
//                           Contact Number
//                         </Text>
//                         <Text className="text-base font-medium text-gray-800 mt-1">
//                           {item.phoneNumber}
//                         </Text>
//                       </View>

//                       <View className="flex-row justify-end mt-2">
//                         <View
//                           className={`px-3 py-1 rounded-full ${getStatusStyle(
//                             item.status
//                           )}`}
//                         >
//                           <Text className="text-xs font-medium capitalize">
//                             {item.status || "confirmed"}
//                           </Text>
//                         </View>
//                       </View>
//                     </View>
//                   ))
//                 )}
//                 <FindDoctor date={date} />
//               </View>
//             ) : (
//               <View className="items-center justify-center py-16 px-6">
//                 <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
//                   Welcome to HealthConnect
//                 </Text>
//                 <Text className="text-base text-center text-gray-600 mb-8">
//                   Sign in to view and book doctor appointments
//                 </Text>

//                 <TouchableOpacity
//                   onPress={handleSignup}
//                   className="w-full bg-blue-600 py-4 rounded-lg"
//                 >
//                   <Text className="text-center text-white font-medium text-lg">
//                     Sign Up / Log In
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default DocChannel;

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FindDoctor from "./../../components/diseases/FindDoctor";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Channel {
  id?: string;
  date: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  status?: "confirmed" | "pending" | "cancelled";
}

const DocChannel = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { disease } = useLocalSearchParams<{ disease: string }>();
  const [channelDetails, setChannelDetails] = useState<Channel[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await getChannellingDetails();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully.", [
        { text: "OK", onPress: () => router.push("/signin") },
      ]);
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
    }
  };

  const getChannellingDetails = async () => {
    try {
      setLoading(true);
      if (!userEmail) return;

      const channelsQuery = query(
        collection(db, "channels"),
        where("email", "==", userEmail)
      );
      const channelSnapshot = await getDocs(channelsQuery);

      if (channelSnapshot.empty) {
        setChannelDetails([]);
        setLoading(false);
        return;
      }

      const fetchedChannels: Channel[] = channelSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Channel)
      );

      setChannelDetails(fetchedChannels);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert("Error", "Failed to load channel details");
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (userEmail) {
      getChannellingDetails();
    }
  }, [userEmail]);

  const handleSignup = () => {
    router.push("/signup");
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const getStatusStyle = (status: Channel["status"] = "confirmed") => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

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
      // Array.from({ length: 3 }).map((_, index) => (
      <Animated.View style={{ opacity }}>
        {Array.from({ length: channelDetails.length }).map((_, index) => (
          <View
            key={index}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm shadow-gray-300"
          >
            {/* Date Skeleton */}
            <View className="flex-row items-center border-b border-gray-100 pb-3 mb-3">
              <View className="w-6 h-6 bg-gray-200 rounded-full" />
              <View className="ml-2 w-32 h-6 bg-gray-200 rounded" />
            </View>

            {/* Patient Name Skeleton */}
            <View className="mb-3">
              <View className="w-20 h-4 bg-gray-200 rounded" />
              <View className="w-40 h-5 bg-gray-200 rounded mt-2" />
            </View>

            {/* Contact Number Skeleton */}
            <View className="mb-3">
              <View className="w-24 h-4 bg-gray-200 rounded" />
              <View className="w-32 h-5 bg-gray-200 rounded mt-2" />
            </View>

            {/* Status Skeleton */}
            <View className="flex-row justify-end mt-2">
              <View className="w-20 h-6 bg-gray-200 rounded-full" />
            </View>
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <SafeAreaView
        style={[
          Platform.OS == "android" && { paddingBottom: 60 },
          Platform.OS == "ios" && { paddingBottom: 20 },
        ]}
        className=" flex-1"
      >
        <View className="flex-1 px-4">
          {/* Header */}
          <View className="my-4">
            <Text className="text-2xl font-bold text-text-dark">
              Your Appointments
            </Text>
          </View>

          {/* Content */}

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#4a90e2"
                colors={["#4a90e2"]}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            {
              userEmail ? (
                loading ? (
                  <SkeletonCard />
                ) : (
                  <View className="pb-5 mt-5">
                    {channelDetails.length === 0 ? (
                      <View className="items-center justify-center p-10 bg-white/70 rounded-xl my-4">
                        <MaterialIcons
                          name="event-busy"
                          size={40}
                          color="#888"
                        />
                        <Text className="mt-3 text-lg font-medium text-gray-600">
                          No appointments found
                        </Text>
                        <Text className="mt-1 text-gray-500">
                          Book your first appointment below
                        </Text>
                      </View>
                    ) : (
                      channelDetails.map((item) => (
                        <View
                          key={item.id}
                          className="bg-white rounded-xl p-4 mb-4 shadow-sm shadow-gray-300"
                        >
                          <View className="flex-row items-center border-b border-gray-100 pb-3 mb-3">
                            <MaterialIcons
                              name="event"
                              size={24}
                              color="#4a90e2"
                            />
                            <Text className="ml-2 text-lg font-semibold text-gray-800">
                              {formatDate(item.date)}
                            </Text>
                          </View>

                          <View className="mb-3">
                            <Text className="text-sm text-gray-500">
                              Patient Name
                            </Text>
                            <Text className="text-base font-medium text-gray-800 mt-1">
                              {item.fullName}
                            </Text>
                          </View>

                          <View className="mb-3">
                            <Text className="text-sm text-gray-500">
                              Contact Number
                            </Text>
                            <Text className="text-base font-medium text-gray-800 mt-1">
                              {item.phoneNumber}
                            </Text>
                          </View>

                          <View className="flex-row justify-end mt-2">
                            <View
                              className={`px-3 py-1 rounded-full ${getStatusStyle(
                                item.status
                              )}`}
                            >
                              <Text className="text-xs font-medium capitalize">
                                {item.status || "confirmed"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))
                    )}
                    <FindDoctor date={date} />
                  </View>
                )
              ) : (
                <View className="items-center justify-center py-16 px-6">
                  <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Welcome to HealthConnect
                  </Text>
                  <Text className="text-base text-center text-gray-600 mb-8">
                    Sign in to view and book doctor appointments
                  </Text>

                  <TouchableOpacity
                    onPress={handleSignup}
                    className="w-full bg-purple-600 py-4 rounded-lg"
                  >
                    <Text className="text-center text-white font-medium text-lg">
                      Sign Up / Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              )
              // **********************
              // **********************
              // **********************
              // **********************
            }
            {/* {userEmail ? (
              <View className="pb-5 mt-5">
                {channelDetails.length === 0 ? (
                  <View className="items-center justify-center p-10 bg-white/70 rounded-xl my-4">
                    <MaterialIcons name="event-busy" size={40} color="#888" />
                    <Text className="mt-3 text-lg font-medium text-gray-600">
                      No appointments found
                    </Text>
                    <Text className="mt-1 text-gray-500">
                      Book your first appointment below
                    </Text>
                  </View>
                ) : (
                  channelDetails.map((item) => (
                    <View
                      key={item.id}
                      className="bg-white rounded-xl p-4 mb-4 shadow-sm shadow-gray-300"
                    >
                      <View className="flex-row items-center border-b border-gray-100 pb-3 mb-3">
                        <MaterialIcons name="event" size={24} color="#4a90e2" />
                        <Text className="ml-2 text-lg font-semibold text-gray-800">
                          {formatDate(item.date)}
                        </Text>
                      </View>

                      <View className="mb-3">
                        <Text className="text-sm text-gray-500">
                          Patient Name
                        </Text>
                        <Text className="text-base font-medium text-gray-800 mt-1">
                          {item.fullName}
                        </Text>
                      </View>

                      <View className="mb-3">
                        <Text className="text-sm text-gray-500">
                          Contact Number
                        </Text>
                        <Text className="text-base font-medium text-gray-800 mt-1">
                          {item.phoneNumber}
                        </Text>
                      </View>

                      <View className="flex-row justify-end mt-2">
                        <View
                          className={`px-3 py-1 rounded-full ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          <Text className="text-xs font-medium capitalize">
                            {item.status || "confirmed"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
                <FindDoctor date={date} />
              </View>
            ) : (
              <View className="items-center justify-center py-16 px-6">
                <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
                  Welcome to HealthConnect
                </Text>
                <Text className="text-base text-center text-gray-600 mb-8">
                  Sign in to view and book doctor appointments
                </Text>

                <TouchableOpacity
                  onPress={handleSignup}
                  className="w-full bg-blue-600 py-4 rounded-lg"
                >
                  <Text className="text-center text-white font-medium text-lg">
                    Sign Up / Log In
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DocChannel;

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
