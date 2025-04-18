import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import validationSchema from "../../utils/guestFormSchema";
import { useFocusEffect } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

interface FindDoctorProps {
  date: Date; // Assuming `date` is a JavaScript Date object
}

const FindDoctor: React.FC<FindDoctorProps> = ({ date }) => {
  useFocusEffect(
    useCallback(() => {
      NavigationBar.setBackgroundColorAsync("#a855f7");
      NavigationBar.setButtonStyleAsync("light");
    }, [])
  );
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  //   const handlePress = () => {
  //     setSlotsVisible(!slotsVisible);
  //   };

  const handleFormSubmit = async (values: {
    fullName: string;
    phoneNumber: string;
  }) => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");
    if (userEmail) {
      try {
        await addDoc(collection(db, "channels"), {
          ...values,
          email: userEmail,
          //   slot: selectedSlot,
          date: date.toISOString(),
          //   guests: selectedNumber,
          //   disease: disease,
        });

        alert("Channelling Successfully Done!");
        setFormVisible(false);
        setModalVisible(false);
      } catch (error) {
        console.log(error);
      }
    } else if (guestStatus === "true") {
      setFormVisible(true);
      setModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  //   const handleSlotPress = (slot) => {
  //     let prevSlot = selectedSlot;
  //     if (prevSlot == slot) {
  //       setSelectedSlot(null);
  //     } else {
  //       setSelectedSlot(slot);
  //     }
  //   };
  //   const handleFormSubmit = async (values) => {
  //     try {
  //       await addDoc(collection(db, "channels"), {
  //         ...values,
  //         // slot: selectedSlot,
  //         date: date.toISOString(),
  //         // guests: selectedNumber,
  //         disease: disease,
  //       });

  //       alert("Booking successfully Done!");
  //       setModalVisible(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <View className="flex-1">
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true), setFormVisible(true);
          }}
        >
          <Text className="text-center text-lg font-semibold bg-purple-600 text-gray-50 p-2 my-3 mx-2 rounded-lg">
            Find Doctor
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#201a2471] justify-end">
          <View className="bg-white rounded-t-lg p-4 pb-6">
            {formVisible && (
              <Formik
                initialValues={{ fullName: "", phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
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
                    <View>
                      <Ionicons
                        name="close-sharp"
                        size={30}
                        color={"#201a24"}
                        onPress={handleCloseModal}
                      />
                    </View>
                    <Text className="text-purple-500 mt-4 mb-2">Name</Text>
                    <TextInput
                      className="h-12 border border-purple-500 text-purple-500 rounded px-2"
                      onChangeText={handleChange("fullName")}
                      value={values.fullName}
                      onBlur={handleBlur("fullName")}
                    />

                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}
                    <Text className="text-purple-500 mt-4 mb-2">
                      Phone Number
                    </Text>
                    <TextInput
                      className="h-12 border border-purple-500 text-purple-500 rounded px-2"
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      onBlur={handleBlur("phoneNumber")}
                    />

                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.phoneNumber}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="p-4 my-2 bg-color1 rounded-lg mt-10 border bg-purple-600 border-purple-600"
                    >
                      <Text className="text-lg font-semibold text-center text-gray-50">
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindDoctor;
