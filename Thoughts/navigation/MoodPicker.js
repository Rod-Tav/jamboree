import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/moodstyles";

const MoodPicker = ({ value, onValueChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [customMood, setCustomMood] = useState("");

  const moodOptions = [
    { label: "Happy", value: "happy" },
    { label: "Sad", value: "sad" },
    { label: "Excited", value: "excited" },
    { label: "Stressed", value: "stressed" },
    { label: "Hopeful", value: "hopeful" },
    { label: "Hopeless", value: "hopeless" },
    { label: "Confused", value: "confused" },
  ];

  const handleMoodPicker = () => {
    setModalVisible(true);
  };

  const handleMoodSelection = (selectedValue) => {
    setSelectedMood(selectedValue === "custom" ? selectedValue : null);
    if (selectedValue === "custom") {
      setCustomMood("");
    }
  };

  const handleCustomMoodChange = (text) => {
    setSelectedMood("");
    setCustomMood(text);
  };

  const handleDone = () => {
    const selected = selectedMood || customMood.trim();
    if (selected) {
      onValueChange(selected);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedMood(null);
    setCustomMood("");
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleMoodPicker}
        style={styles.buttonContainer}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="add" size={30} style={styles.icon} />
        </View>
        <Text>How are you feeling?</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How are you feeling?</Text>

            {moodOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleMoodSelection(option.value)}
                style={[
                  styles.moodOption,
                  selectedMood === option.value && styles.selectedMoodOption,
                ]}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <TextInput
              style={styles.customMoodInput}
              value={customMood}
              onChangeText={handleCustomMoodChange}
              placeholder="Enter your own mood"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.modalButton}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDone} style={styles.modalButton}>
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
