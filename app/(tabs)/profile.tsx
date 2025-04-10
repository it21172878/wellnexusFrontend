import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
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
      // setTimeout(() => {
      //   router.push("/signin");
      // }, 2000); // Redirect after 2 seconds
      // // router.push("/signin");
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out");
    }
  };
  const handleSignin = () => {
    router.push("/signin");
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#f7f7fc" },
        Platform.OS == "android" && { paddingBottom: 0 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <ScrollView
        style={{
          backgroundColor: "#f7f7fc",
          height: "100%",
        }}
      >
        <View className="flex-1 justify-center items-center mt-10">
          {userEmail ? (
            <>
              <Text className="text-3xl text-color1 font-semibold mb-4">
                Welcome To Your Profile
              </Text>
              <Text className="text-color2 text-lg mb-6">
                Email: {userEmail}
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                className=" bg-color2 rounded-lg p-2 my-3 mx-2"
              >
                <Text className="text-lg font-semibold text-center text-color6">
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className="text-3xl text-color3 font-semibold mb-4">
                Oops!
              </Text>
              <Text className="text-xl text-color1 font-semibold mb-4">
                To Achive This You Must Login
              </Text>
              <TouchableOpacity
                onPress={handleSignin}
                className="p-2 my-2 bg-color2 rounded-lg mt-10"
              >
                <Text className="text-lg font-semibold text-center text-color6">
                  Log In
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
