import React from "react";
import RNPickerSelect from "react-native-picker-select";

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
    />
  );
};

export default MoodPicker;
