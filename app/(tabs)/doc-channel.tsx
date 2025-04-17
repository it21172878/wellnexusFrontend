// import {
//   View,
//   Text,
//   Alert,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { getAuth, signOut } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import FindDoctor from "./../../components/diseases/FindDoctor";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
// import { SafeAreaView } from "react-native-safe-area-context";

// interface Channel {
//   date: string;
//   email: string;
//   fullName: string;
//   phoneNumber: string;
// }

// const DocChannel = () => {
//   const [date, setDate] = useState(new Date());
//   const { disease } = useLocalSearchParams();
//   const [channelDetails, setChannelDetails] = useState<Channel[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true); // Start the spinner
//     await getChannellingDetails(); // Re-fetch the channels
//     setRefreshing(false); // Stop the spinner
//   };

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
//     } catch (error) {
//       Alert.alert("Logged Error", "Error while logging out");
//     }
//   };

//   const getChannellingDetails = async () => {
//     try {
//       const channelsQuery = query(
//         collection(db, "channels"),
//         where("email", "==", userEmail)
//       );
//       const channelSnapshot = await getDocs(channelsQuery);
//       if (channelSnapshot.empty) {
//         console.log("No matching channel found");
//         return;
//       }
//       const fetchedChannels: Channel[] = [];
//       for (const doc of channelSnapshot.docs) {
//         const channelDetails = doc.data();

//         // Validate and transform the data if necessary
//         if (
//           typeof channelDetails.email === "string" &&
//           typeof channelDetails.fullName === "string" &&
//           typeof channelDetails.date === "string" &&
//           typeof channelDetails.phoneNumber === "string"
//         ) {
//           fetchedChannels.push(channelDetails as Channel);
//         } else {
//           console.warn("Invalid channel data structure:", channelDetails);
//         }

//         // setDiseaseData(diseaseData as Disease[]);
//         setChannelDetails(fetchedChannels);
//       }
//     } catch (error) {
//       console.log("Error fetching data", error);
//     }
//   };
//   useEffect(() => {
//     getChannellingDetails();
//   }, [userEmail]);

//   const handleSignup = () => {
//     router.push("/signup");
//   };

//   console.log("Channel Details:", channelDetails);
//   console.log("user email", userEmail);
//   return (
//     <SafeAreaView
//       style={[
//         { backgroundColor: "#f7f7fc" },
//         Platform.OS == "android" && { paddingBottom: 0 },
//         Platform.OS == "ios" && { paddingBottom: 20 },
//       ]}
//     >
//       <View style={{ flex: -1 }}>
//         <View className=" my-2 p-2">
//           <Text className="text-xl text-color4 mr-2 font-semibold">
//             Channel Your Doctor
//           </Text>
//           <View className="border-b border-color4" />
//         </View>
//         <ScrollView
//           style={{
//             // opacity: 0.8,
//             // backgroundColor: "black",
//             height: 600,
//             marginTop: -10,
//           }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor="#c78441"
//               colors={["#c78441"]} // For Android spinner
//             />
//           }
//           showsVerticalScrollIndicator={false}
//         >
//           {userEmail ? (
//             <View className=" my-2 p-2">
//               <View style={{ flex: -1 }}>
//                 {channelDetails.map((item, index) => {
//                   // Format the date
//                   const formattedDate = new Intl.DateTimeFormat("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   }).format(new Date(item.date));
//                   return (
//                     <View
//                       key={index}
//                       className="mb-2 bg-color2 blur-lg rounded-md p-2"
//                     >
//                       <View className=" ">
//                         <Text className="text-color6 text-lg opacity-70">
//                           Name
//                         </Text>
//                         <Text className="text-color1 text-lg">
//                           {item.fullName}
//                         </Text>
//                       </View>
//                       <View className="">
//                         <Text className="text-color6 text-lg opacity-70">
//                           Date
//                         </Text>
//                         <Text className="text-color1 text-lg">
//                           {formattedDate}
//                         </Text>
//                       </View>
//                       <View className="">
//                         <Text className="text-color6 text-lg opacity-70">
//                           Telephone Number
//                         </Text>
//                         <Text className="text-color1 text-lg">
//                           {item.phoneNumber}
//                         </Text>
//                       </View>
//                     </View>
//                   );
//                 })}

//                 {/* <View className="flex-1"> */}
//                 <FindDoctor date={date} />
//                 {/* </View> */}
//               </View>
//             </View>
//           ) : (
//             <>
//               <TouchableOpacity
//                 onPress={handleSignup}
//                 className="p-2 my-2 bg-color2 rounded-lg mt-10"
//               >
//                 <Text className="text-lg font-semibold text-center text-color6">
//                   Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default DocChannel;

// ************************************** START **************************************
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
  RefreshControl,
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
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert("Error", "Failed to load channel details");
    } finally {
      setLoading(false);
    }
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
            <Text className="text-2xl font-bold text-gray-800">
              Your Appointments
            </Text>
            <View className="h-0.5 w-2/5 bg-gray-300 mt-2" />
          </View>

          {/* Content */}

          <ScrollView
            // className="flex-1"
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
            {userEmail ? (
              <View className="pb-5">
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
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DocChannel;

// ************************************** END ****************************************
