import React from "react";
import RNPickerSelect from "react-native-picker-select";
import Ionicons from "react-native-vector-icons/Ionicons";

const MoodPicker = ({ value, onValueChange }) => {
  const moodOptions = [
    { label: "Happy", value: "happy" },
    { label: "Sad", value: "sad" },
    { label: "Neutral", value: "neutral" },
    // Add more mood options as needed
  ];

  return (
    <RNPickerSelect
      value={value}
      onValueChange={onValueChange}
      items={moodOptions}
      placeholder={{ label: "Select Mood", value: null }}
      Icon={() => {
        return <Ionicons name="caret-down-outline" />;
      }}
    />
  );
};

export default MoodPicker;
