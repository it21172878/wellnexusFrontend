import { View, Text, Platform, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Treatments = () => {
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 0 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <ScrollView
        style={{ marginTop: 0, backgroundColor: "#f7f7fc", height: "100%" }}
      >
        <View>
          <View className="flex-row items-center justify-center mt-10 mb-5">
            <Text className="text-3xl text-color1 mr-2 font-semibold">
              Treatments
            </Text>
          </View>
          <View className="flex-row items-center justify-center mt-10 mb-5">
            <Text className="text-xl text-color2 mr-2 font-semibold">
              No treatments available yet.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Treatments;
