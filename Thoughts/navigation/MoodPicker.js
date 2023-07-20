import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moodstyles from "../styles/moodstyles";
import styles from "../styles/styles";
import SkinnyIcon from "react-native-snappy";

const MoodPicker = ({ value, setValue }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mood, setMood] = useState("");
  const [customMood, setCustomMood] = useState("");

  const moodOptions = [
    { label: "Happy", value: "Happy" },
    { label: "Sad", value: "Sad" },
    { label: "Excited", value: "Excited" },
    { label: "Stressed", value: "Stressed" },
    { label: "Hopeful", value: "Hopeful" },
    { label: "Hopeless", value: "Hopeless" },
    { label: "Confused", value: "Confused" },
  ];

  const handleMoodPicker = () => {
    setModalVisible(true);
  };

  const handleMoodSelection = (selectedValue) => {
    setCustomMood("");
    setMood(selectedValue);
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  };

  const handleCustomMoodSelection = (selectedValue) => {
    setCustomMood(selectedValue);
    setMood("");
  };

  const handleDone = () => {
    setValue(mood || customMood);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setMood("");
    setCustomMood("");
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleMoodPicker}
        style={styles.buttonContainer}
      >
        <View style={styles.buttonIcon}>
          <SkinnyIcon name="plus" size={16} strokeWidth={1.5} color="#979C9E" />
        </View>
        {value == "" ? (
          <Text style={styles.buttonText}>How are you feeling?</Text>
        ) : (
          <Text>{value}</Text>
        )}
        <View style={styles.buttonIcon}>
          <SkinnyIcon
            name="image"
            size={20}
            strokeWidth={1.5}
            color="#F2F2F2"
          />
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={moodstyles.modalContainer}>
          <View style={moodstyles.modalContent}>
            <Text style={moodstyles.modalTitle}>How are you feeling?</Text>
            {moodOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleMoodSelection(option.value)}
                style={[
                  moodstyles.moodOption,
                  mood === option.value && moodstyles.selectedMoodOption,
                ]}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <TextInput
              style={moodstyles.customMoodInput}
              value={customMood}
              onChangeText={handleCustomMoodSelection}
              placeholder="Or add your own..."
            />

            <View style={moodstyles.modalButtonContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={moodstyles.cancelButton}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDone}
                style={moodstyles.doneButton}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MoodPicker;
