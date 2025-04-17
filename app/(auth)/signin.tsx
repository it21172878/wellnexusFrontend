import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Formik } from "formik";
import validationSchema from "@/utils/authSchema";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as NavigationBar from "expo-navigation-bar";

interface SignupFormValues {
  email: string;
  password: string;
}

const Signin = () => {
  useFocusEffect(
    useCallback(() => {
      // Set nav bar color when this screen is focused
      NavigationBar.setBackgroundColorAsync("#a855f7");
      NavigationBar.setButtonStyleAsync("light");

      // return () => {
      //   // Optional: Reset when leaving the screen
      //   NavigationBar.setBackgroundColorAsync("#A0A899");
      //   NavigationBar.setButtonStyleAsync("light");
      // };
    }, [])
  );
  const router = useRouter();

  const auth = getAuth();
  const db = getFirestore();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  const handleSignin = async (values: SignupFormValues) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        Alert.alert("Login Failed!", "User does not exist. Please sign up.", [
          { text: "OK" },
        ]);
        return;
      } else {
        await AsyncStorage.setItem("userEmail", values.email);
        await AsyncStorage.setItem("isGuest", "false");

        router.push("/home");
      }
    } catch (error) {
      console.log(error);

      if (typeof error === "object" && error !== null && "code" in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === "auth/invalid-credential") {
          Alert.alert(
            "Signin Failed!",
            "Invalid credentials. Please try again.",
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Signin Error",
            "An unexpected error occurred. Please try again later.",
            [{ text: "OK" }]
          );
        }
      } else {
        Alert.alert(
          "Signin Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    // <LinearGradient
    //   // colors={["#292231", "#1D2C20","#2E462B","#5C6D5E","#A0A899"]}
    //   colors={["#0E1609", "#1D2C20", "#2E462B"]}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   locations={[0.2, 0.6, 0.8]}
    // >
    <LinearGradient colors={["#f7f7fc", "#e6f2ff"]} className="flex-1">
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className=" py-16 p-2 flex items-center h-full">
            {/* <Image source={logo} style={{ width: 195, height: 90 }} /> */}
            <Text className="font-extrabold text-6xl mt-10">
              <Text className=" text-purple-500 font-extrabold">well</Text>
              <Text className=" text-purple-950 font-extrabold">neXus</Text>
            </Text>
            {/* <Text className="text-lg text-center text-color1 font-bold mt-28">
            Let's get you started
          </Text> */}
            <View className=" w-5/6 mt-40">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSignin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full">
                    <Text className="text-purple-500 mt-4 mb-2">Email</Text>
                    <TextInput
                      className="h-14 border border-purple-500 text-color1 rounded px-2"
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      value={values.email}
                      onBlur={handleBlur("email")}
                    />
                    {touched.email && errors.email && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.email}
                      </Text>
                    )}
                    <Text className="text-purple-500 mt-4 mb-2">Password</Text>
                    <TextInput
                      className="h-14 border border-purple-500 text-color1 rounded px-2"
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      value={values.password}
                      onBlur={handleBlur("password")}
                    />

                    {touched.password && errors.password && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.password}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className=" bg-purple-500 border border-purple-500 p-3 rounded-lg w-full mt-5 text-center items-center "
                    >
                      <Text className=" text-xl font-semibold text-background-light">
                        {" "}
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View className="flex justify-center items-center mt-5">
                <TouchableOpacity
                  className="flex flex-row justify-center items-center"
                  onPress={() => router.push("/signup")}
                >
                  <Text className="text-text-medium font-semibold">
                    New User?{" "}
                  </Text>
                  <Text className="text-base font-semibold underline text-text-dark">
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <Text className="text-center text-base  font-semibold mb-4 text-text-medium">
                  <View className="border-b-2 border-purple-500 p-2 mb-1 w-24" />{" "}
                  or{" "}
                  <View className="border-b-2 border-purple-500 p-2 mb-1 w-24" />
                </Text>
                <TouchableOpacity
                  onPress={handleGuest}
                  className="flex flex-row justify-center mb-5 p-2 items-center"
                >
                  <Text className="text-text-medium font-semibold">Be a </Text>
                  <Text className="text-base font-semibold underline text-text-dark">
                    Guest User
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signin;
