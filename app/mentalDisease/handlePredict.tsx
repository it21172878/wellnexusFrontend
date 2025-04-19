import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SentimentResult = "positive" | "negative" | "neutral" | string;

const HandlePredict = () => {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveToFirestore = async (
    userReview: string,
    predictedSentiment: string
  ) => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");
    if (userEmail) {
      try {
        await addDoc(collection(db, "predict_analyze"), {
          email: userEmail,
          review: userReview,
          sentiment: predictedSentiment,
          createdAt: serverTimestamp(),
        });
        setSuccess(true);
      } catch (firestoreError) {
        console.error("Error writing to Firestore: ", firestoreError);
        setError("Failed to save analysis. Please try again.");
        setSuccess(false);
      }
    } else if (guestStatus === "true") {
      setError(
        "You need to log in to save your analysis. Please log in and try again."
      );
      setSuccess(false);
    }
  };

  const handlePredict = async () => {
    if (!review.trim()) {
      setError("Please enter your review first");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Get sentiment prediction
      const response = await axios.post("http://192.168.221.85:5000/predict", {
        review: review,
      });

      const predictedSentiment = response.data.sentiment;
      setSentiment(predictedSentiment);

      // Save to Firestore
      await saveToFirestore(review, predictedSentiment);
    } catch (error: any) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.error ||
          error.message ||
          "Error predicting sentiment"
      );
      setSentiment(null);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "bg-emerald-100 border-emerald-500";
      case "negative":
        return "bg-red-100 border-red-500";
      case "neutral":
        return "bg-blue-100 border-blue-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const getSentimentIcon = () => {
    switch (sentiment) {
      case "positive":
        return "happy";
      case "negative":
        return "sad";
      default:
        return "help-circle";
    }
  };

  const getSentimentMessage = () => {
    switch (sentiment) {
      case "positive":
        return "Great progress! Keep up the good work!";
      case "negative":
        return "Let's work together to improve this.";
      case "neutral":
        return "Your feedback is valuable to us.";
      default:
        return "Thank you for sharing your thoughts.";
    }
  };

  const getIconColor = () => {
    switch (sentiment) {
      case "positive":
        return "#10b981";
      case "negative":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  const getTextColor = () => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <SafeAreaView
        className={`flex-1 ${Platform.OS === "android" ? "pb-0" : "pb-5"}`}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Progress Check",
            headerBackTitle: "Back",
            presentation: "card",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: "#a855f7" },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600",
              color: "#F3E8FF",
            },
            headerTintColor: "#F3E8FF",
          }}
        />

        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="mt-5">
            {/* Header Section */}
            <View className="items-center mb-8">
              <Ionicons name="analytics" size={32} color="#7c3aed" />
              <Text className="text-2xl font-semibold text-gray-800 mt-2 mb-1">
                Share Your Experience
              </Text>
              <Text className="text-base text-gray-600 text-center leading-6">
                Your feedback helps us understand your health status and improve
                our services.
              </Text>
            </View>

            {/* Input Section */}
            <View className="mb-6">
              <TextInput
                className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-800 h-40 text-align-top shadow-sm"
                placeholder="How was your experience with this event?"
                placeholderTextColor="#9ca3af"
                value={review}
                onChangeText={(text) => {
                  setReview(text);
                  setError(null);
                  setSuccess(false);
                }}
                multiline
                textAlignVertical="top"
              />
              {error && !review.trim() && (
                <Text className="text-red-500 text-sm mt-1">{error}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`bg-violet-600 rounded-xl p-5 items-center justify-center shadow-lg ${
                loading ? "opacity-80" : ""
              }`}
              onPress={handlePredict}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Analyze My Progress
                </Text>
              )}
            </TouchableOpacity>

            {/* Success Message */}
            {success && (
              <View className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="text-green-600 ml-2">
                  Analysis saved successfully!
                </Text>
              </View>
            )}

            {/* Result Section */}
            {sentiment && (
              <View
                className={`mt-6 p-5 rounded-xl border-2 ${getSentimentColor()} shadow-sm`}
              >
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name={getSentimentIcon()}
                    size={24}
                    color={getIconColor()}
                  />
                  <Text
                    className={`ml-2 text-lg font-semibold ${getTextColor()}`}
                  >
                    Your Progress is {sentiment}
                  </Text>
                </View>
                <Text className="text-gray-700 text-base leading-6">
                  {getSentimentMessage()}
                </Text>
              </View>
            )}

            {/* Error Section */}
            {error && !success && (
              <View className="mt-6 p-4 bg-red-50 rounded-xl flex-row items-center">
                <Ionicons name="warning" size={24} color="#ef4444" />
                <Text className="ml-2 text-red-600 text-base flex-1">
                  {error}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HandlePredict;
