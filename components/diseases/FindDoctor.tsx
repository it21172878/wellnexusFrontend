import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import validationSchema from "../../utils/guestFormSchema";

interface FindDoctorProps {
  date: Date; // Assuming `date` is a JavaScript Date object
}

const FindDoctor: React.FC<FindDoctorProps> = ({ date }) => {
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
          <Text className="text-center text-lg font-semibold bg-color1 text-color6 p-2 my-3 mx-2 rounded-lg">
            Find Doctor
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View className={`flex ${selectedSlot != null && "flex-row"} `}>
        <View className={`${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity onPress={handleChannelling}>
              <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View> */}
      {/* <View className="flex-1">
        <TouchableOpacity onPress={handleChannelling}>
          <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
            Channel Doctor
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* {slotsVisible && (
        <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
          {slots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              className={` m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${
                selectedSlot && selectedSlot !== slot ? "opacity-50" : ""
              }`}
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot == slot || selectedSlot == null ? false : true
              }
            >
              <Text className="text-white font-bold">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )} */}
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
          <View className="bg-color6 mx-4 rounded-t-lg p-4 pb-6">
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
                    <Text className="text-color1 mt-4 mb-2">Name</Text>
                    <TextInput
                      className="h-12 border border-color1 text-color1 rounded px-2"
                      onChangeText={handleChange("fullName")}
                      value={values.fullName}
                      onBlur={handleBlur("fullName")}
                    />

                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}
                    <Text className="text-color1 mt-4 mb-2">Phone Number</Text>
                    <TextInput
                      className="h-12 border border-color1 text-color1 rounded px-2"
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
                      className="p-4 my-2 bg-color1 rounded-lg mt-10"
                    >
                      <Text className="text-lg font-semibold text-center  text-color6">
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
