// import { View, Text, Platform, ScrollView } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Treatments = () => {
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
//         <View>
//           <View className="flex-row items-center justify-center mt-10 mb-5">
//             <Text className="text-3xl text-color1 mr-2 font-semibold">
//               Treatments
//             </Text>
//           </View>
//           <View className="flex-row items-center justify-center mt-10 mb-5">
//             <Text className="text-xl text-color2 mr-2 font-semibold">
//               No treatments available yet.
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Treatments;

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  Feather,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Moods = {
  happy: {
    icon: "emoji-happy" as const,
    bgColor: "bg-green-100" as const,
    iconColor: "#10b981" as const,
  },
  neutral: {
    icon: "emoji-sad" as const,
    bgColor: "bg-yellow-100" as const,
    iconColor: "#f59e0b" as const,
  },
  sad: {
    icon: "emoji-sad" as const,
    bgColor: "bg-red-100" as const,
    iconColor: "#ef4444" as const,
  },
} as const;

type MoodType = keyof typeof Moods;
type TherapyTechnique = {
  id: number;
  name: string;
  icon: string;
  color: string;
};
type EmergencyResource = {
  id: number;
  name: string;
  number: string;
};
const TreatmentPage = () => {
  // Sample data - replace with your actual data

  const treatmentProgress = 67;
  const currentMood: MoodType = "happy";
  const techniques: TherapyTechnique[] = [
    {
      id: 1,
      name: "Cognitive Behavioral",
      icon: "brain",
      color: "bg-blue-100",
    },
    { id: 2, name: "Mindfulness", icon: "leaf", color: "bg-green-100" },
    { id: 3, name: "Breathing", icon: "wind", color: "bg-purple-100" },
    { id: 4, name: "Journaling", icon: "book", color: "bg-yellow-100" },
  ];
  const resources: EmergencyResource[] = [
    { id: 1, name: "Crisis Hotline", number: "988" },
    { id: 2, name: "Therapist", number: "Dr. Smith (555) 123-4567" },
  ];
  const activeMood = Moods[currentMood]; // This will always be type-safe

  return (
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center p-6 pt-12 bg-white shadow-sm">
          <Text className="text-2xl font-bold text-gray-800">WellNexus</Text>
          <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
            <Feather name="user" size={20} color="#3b82f6" />
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Welcome message */}
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Your Treatment Plan
          </Text>
          <Text className="text-gray-500 mb-6">
            You're making great progress!
          </Text>

          {/* Daily Check-in Card */}
          <View className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-semibold text-gray-800">
                Daily Check-in
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </View>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-gray-500">How are you feeling today?</Text>
              <View className={`p-2 rounded-full ${activeMood.bgColor}`}>
                <Entypo
                  name={activeMood.icon}
                  size={24}
                  color={activeMood.iconColor}
                />
              </View>
            </View>

            <TouchableOpacity className="bg-purple-500 py-3 rounded-lg items-center">
              <Text className="text-gray-50 font-medium">
                Complete Check-in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Treatment Progress */}
          <View className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <Text className="font-semibold text-gray-800 mb-4">
              Treatment Progress
            </Text>

            <View className="mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-500">Weekly completion</Text>
                <Text className="text-gray-800 font-medium">
                  {treatmentProgress}%
                </Text>
              </View>
              <View className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${treatmentProgress}%` }}
                />
              </View>
            </View>

            <View className="flex-row justify-between mt-4">
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Sessions</Text>
                <Text className="text-gray-800 font-medium">12/16</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Exercises</Text>
                <Text className="text-gray-800 font-medium">8/10</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Goals</Text>
                <Text className="text-gray-800 font-medium">3/5</Text>
              </View>
            </View>
          </View>

          {/* Therapy Techniques */}
          <Text className="font-semibold text-gray-800 mb-3 mt-2">
            Therapy Techniques
          </Text>
          <View className="flex-row flex-wrap justify-between mb-6">
            {techniques.map((tech) => (
              <TouchableOpacity
                key={tech.id}
                className={`w-[48%] ${tech.color} rounded-xl p-4 mb-4 items-center`}
              >
                <FontAwesome5 name={tech.icon} size={24} color="#4b5563" />
                <Text className="text-gray-700 font-medium mt-2 text-center">
                  {tech.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Emergency Resources */}
          <View className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <Text className="font-semibold text-gray-800 mb-4">
              Emergency Resources
            </Text>

            {resources.map((res) => (
              <TouchableOpacity
                key={res.id}
                className="flex-row items-center py-3 border-b border-gray-100 last:border-0"
              >
                <View className="bg-red-100 p-2 rounded-full mr-3">
                  <Ionicons name="call" size={18} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">{res.name}</Text>
                  <Text className="text-gray-500 text-sm">{res.number}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View className="flex-row justify-around items-center py-3 bg-white border-t border-gray-200">
          <TouchableOpacity className="items-center">
            <Feather name="home" size={24} color="#3b82f6" />
            <Text className="text-blue-500 text-xs mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="book" size={24} color="#9ca3af" />
            <Text className="text-gray-500 text-xs mt-1">Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="activity" size={24} color="#9ca3af" />
            <Text className="text-gray-500 text-xs mt-1">Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="settings" size={24} color="#9ca3af" />
            <Text className="text-gray-500 text-xs mt-1">Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TreatmentPage;
