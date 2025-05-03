import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

interface History {
  id?: string;
  review: string;
  email: string;
  sentiment: string;
}

const historyAnalyze = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await getHistoryData();
    setRefreshing(false);
  };
  const getHistoryData = async () => {
    try {
      //   setLoading(true);
      if (!userEmail) return;

      const historyQuery = query(
        collection(db, "predict_analyze"),
        where("email", "==", userEmail)
      );
      const historySnapshot = await getDocs(historyQuery);

      if (historySnapshot.empty) {
        setHistoryData([]);
        // setLoading(false);
        return;
      }

      const fetchedHistoryData: History[] = historySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as History)
      );

      setHistoryData(fetchedHistoryData);

      //   setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert("Error", "Failed to load history data");
    }
  };
  useEffect(() => {
    getHistoryData();
  }, [userEmail]);
  console.log("Fetched history data:", historyData);
  return (
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <SafeAreaView
        style={[
          Platform.OS == "android" && { paddingBottom: 0 },
          Platform.OS == "ios" && { paddingBottom: 20 },
        ]}
        className=" flex-1"
      >
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
          <View>
            <Stack.Screen
              options={{
                headerShown: true,
                title: "History",
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
            {historyData.length > 0 ? (
              historyData.map((item) => (
                <View key={item.id} className="bg-white p-4 m-2 rounded-lg">
                  <Text className="text-lg font-bold">{item.review}</Text>
                  <Text className="text-gray-500">{item.sentiment}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-500">No history data available</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default historyAnalyze;
