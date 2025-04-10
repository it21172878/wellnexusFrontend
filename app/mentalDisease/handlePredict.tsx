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
      const response = await axios.post("http://192.168.190.85:5000/predict", {
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
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 270 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View>
        <ScrollView
          style={{
            // opacity: 0.8,
            // backgroundColor: "black",
            height: 450,
          }}
        >
          <View className=" my-2 p-2">
            <View>
              <Text className=" text-xl text-color4 font-semibold">
                Fun Events Predict
              </Text>
              <View className="border-b border-color4" />
            </View>
            {/* <Header
        left={
          <Link href={"/"} asChild>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </Link>
        }
        centerText="Fun Events"
      /> */}

            <View className=" items-center justify-center">
              <View className=" items-center justify-center mt-2">
                <Text className=" text-xl/2 text-justify font-light text-color1 ">
                  Please feel to free your experiences with us regarding this
                  event. It will help us gain some insight into your health
                  status.
                </Text>
              </View>
              <View className=" items-center justify-center mt-2">
                <TextInput
                  placeholder="Enter your review..."
                  className=" items-center justify-center w-96 border border-color1 rounded-lg text-base mt-4 focus:border-lime-600 focus:ring-1 focus:ring-color1"
                  value={review}
                  onChangeText={setReview}
                />
              </View>
            </View>
            <View className=" items-center justify-center p-2">
              <TouchableOpacity
                onPress={handlePredict}
                className="bg-color1 rounded-md p-4 mt-2 w-full items-center"
              >
                <Text className=" text-color6 font-semibold">
                  Share your Expression{" "}
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
