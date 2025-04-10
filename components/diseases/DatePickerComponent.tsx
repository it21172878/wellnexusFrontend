import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DateTimePickerProps {
  onConfirm: (date: Date) => void;
}

const DatePickerComponent: React.FC<DateTimePickerProps> = ({ onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showPicker = () => setIsVisible(true);
  const hidePicker = () => setIsVisible(false);

  const handleConfirm = (date: Date) => {
    onConfirm(date);
    hidePicker(); // Hide the picker after selection
  };

  return (
    <View className="flex-1 w-44 h-12 items-center bg-color1 justify-center border rounded-lg border-color1 p-2 text-center">
      {/* <Button title="Pick a Date & Time" onPress={showPicker} /> */}
      <TouchableOpacity onPress={showPicker}>
        <Text className=" text-color6 items-center font-medium">
          Select a Date & Time
        </Text>
        <DateTimePickerModal
          isVisible={isVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;
