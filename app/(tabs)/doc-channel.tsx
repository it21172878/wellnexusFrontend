// import {
//   View,
//   Text,
//   Alert,
//   TouchableOpacity,
//   Platform,
//   ScrollView,
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
//       <ScrollView
//         style={{ marginTop: 0, backgroundColor: "#f7f7fc", height: "100%" }}
//       >
//         <View className="flex-1 justify-center items-center mt-10">
//           <Text className="text-3xl text-color1 font-semibold mb-4">
//             Channel Your Doctor
//           </Text>
//           {userEmail ? (
//             <>
//               <Text className="text-color2 text-lg mb-6">
//                 Email: {userEmail}
//               </Text>

//               <View className="flex-1">
//                 <FindDoctor date={date} />
//               </View>
//             </>
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
//         </View>
//       </ScrollView>
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

interface Channel {
  date: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

const DocChannel = () => {
  const [date, setDate] = useState(new Date());
  const { disease } = useLocalSearchParams();
  const [channelDetails, setChannelDetails] = useState<Channel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true); // Start the spinner
    await getChannellingDetails(); // Re-fetch the channels
    setRefreshing(false); // Stop the spinner
  };

  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
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
      const channelsQuery = query(
        collection(db, "channels"),
        where("email", "==", userEmail)
      );
      const channelSnapshot = await getDocs(channelsQuery);
      if (channelSnapshot.empty) {
        console.log("No matching channel found");
        return;
      }
      const fetchedChannels: Channel[] = [];
      for (const doc of channelSnapshot.docs) {
        const channelDetails = doc.data();

        // Validate and transform the data if necessary
        if (
          typeof channelDetails.email === "string" &&
          typeof channelDetails.fullName === "string" &&
          typeof channelDetails.date === "string" &&
          typeof channelDetails.phoneNumber === "string"
        ) {
          fetchedChannels.push(channelDetails as Channel);
        } else {
          console.warn("Invalid channel data structure:", channelDetails);
        }

        // setDiseaseData(diseaseData as Disease[]);
        setChannelDetails(fetchedChannels);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    getChannellingDetails();
  }, [userEmail]);

  const handleSignup = () => {
    router.push("/signup");
  };

  console.log("Channel Details:", channelDetails);
  console.log("user email", userEmail);
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 0 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View style={{ flex: -1 }}>
        <View className=" my-2 p-2">
          <Text className="text-xl text-color4 mr-2 font-semibold">
            Channel Your Doctor
          </Text>
          <View className="border-b border-color4" />
        </View>
        <ScrollView
          style={{
            // opacity: 0.8,
            // backgroundColor: "black",
            height: 600,
            marginTop: -10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#c78441"
              colors={["#c78441"]} // For Android spinner
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {userEmail ? (
            <View className=" my-2 p-2">
              <View style={{ flex: -1 }}>
                {channelDetails.map((item, index) => {
                  // Format the date
                  const formattedDate = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(item.date));
                  return (
                    <View
                      key={index}
                      className="mb-2 bg-color2 blur-lg rounded-md p-2"
                    >
                      <View className=" ">
                        <Text className="text-color6 text-lg opacity-70">
                          Name
                        </Text>
                        <Text className="text-color1 text-lg">
                          {item.fullName}
                        </Text>
                      </View>
                      <View className="">
                        <Text className="text-color6 text-lg opacity-70">
                          Date
                        </Text>
                        <Text className="text-color1 text-lg">
                          {formattedDate}
                        </Text>
                      </View>
                      <View className="">
                        <Text className="text-color6 text-lg opacity-70">
                          Telephone Number
                        </Text>
                        <Text className="text-color1 text-lg">
                          {item.phoneNumber}
                        </Text>
                      </View>
                    </View>
                  );
                })}

                {/* <View className="flex-1"> */}
                <FindDoctor date={date} />
                {/* </View> */}
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={handleSignup}
                className="p-2 my-2 bg-color2 rounded-lg mt-10"
              >
                <Text className="text-lg font-semibold text-center text-color6">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DocChannel;

// ************************************** END ****************************************
