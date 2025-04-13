import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
// import Header from "@/layouts/header";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Link } from "expo-router";

const HandlePredict = () => {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!review.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://192.168.71.85:5000/predict", {
        review: review,
      });
      console.log("response", response);

      setSentiment(response.data.sentiment);
    } catch (error: any) {
      console.log(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      setSentiment(
        "Error: " + (error.response ? error.response.data.error : error.message)
      );

      // setSentiment("Error predicting sentiment");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f9fafb" },
        Platform.OS == "android" && { paddingBottom: 270 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Check Progress",
            headerBackTitle: "Back",
            presentation: "card", // or 'modal', 'transparentModal'
            animation: "slide_from_right", // 'fade', 'slide_from_bottom', etc.
            headerStyle: {
              backgroundColor: "#a855f7", // Change the background color of the header
            },
            headerTitleStyle: {
              fontSize: 20, // Change the font size of the title
              fontWeight: "semibold", // Make the title bold
              color: "#f9fafb", // Change the color of the title
            },
            headerTintColor: "#f9fafb", // Change the color of the back button
          }}
        />
        <ScrollView
          style={{
            // opacity: 0.8,
            // backgroundColor: "black",
            height: 450,
            marginTop: -15,
          }}
        >
          <View>
            {/* <View>
              <Text className=" text-xl text-color4 font-semibold">
                Fun Events Predict
              </Text>
              <View className="border-b border-color4" />
            </View> */}

            <View className=" items-center justify-center ">
              <View className="">
                <Text className=" text-xl/2 text-justify font-light text-color1 ">
                  Please feel to free your experiences with us regarding this
                  event. It will help us gain some insight into your health
                  status.
                </Text>
              </View>

              <View>
                <TextInput
                  placeholder="Enter your review..."
                  value={review}
                  onChangeText={setReview}
                  className=" w-[346px] border border-color1 rounded-lg text-base mt-4 focus:border-color3 "
                />
              </View>
            </View>
            <View className=" items-center justify-center p-2">
              <TouchableOpacity
                onPress={handlePredict}
                className="bg-primary-500 border border-primary-500 rounded-md p-4 mt-2 w-full items-center"
              >
                <Text className=" text-gray-50 font-semibold">
                  Share Your Expression
                </Text>
              </TouchableOpacity>
            </View>

            {/* {sentiment && (
        <View className=" items-center justify-center m-2 bg-lime-200 shadow-md rounded-lg p-4 mt-4">
          <Text>Sentiment: {sentiment}</Text>
        </View>
      )} */}

            {/* Sentiment Result Card with Dynamic Colors */}
            {sentiment && (
              <View
                className={` m-2 shadow-md rounded-lg p-4 mt-4 ${
                  sentiment === "positive"
                    ? "bg-color2 border border-color1"
                    : "bg-color5 border border-color1"
                }`}
              >
                <Text
                  className={`font-semibold text-lg ${
                    sentiment === "positive" ? "text-color1" : "text-color1"
                  }`}
                >
                  Your Progress is {sentiment}
                </Text>
                <Text
                  className={`mt-2 ${
                    sentiment === "positive" ? "text-color6" : "text-color6"
                  }`}
                >
                  {sentiment === "positive"
                    ? "Great! Keep it up"
                    : "Oops! You need to work on it"}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HandlePredict;
