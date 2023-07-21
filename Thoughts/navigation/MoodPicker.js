import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import moodstyles from "../styles/moodstyles";
import styles from "../styles/styles";
import SkinnyIcon from "react-native-snappy";

const MoodPicker = ({
  value,
  setValue,
  moodBgColorValue,
  setMoodBgColorValue,
  moodTextColorValue,
  setMoodTextColorValue,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mood, setMood] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [customMood, setCustomMood] = useState("");

  const moodOptions = [
    {
      label: "Happy",
      value: "Happy",
      bgColor: "#ECFCE5",
      textColor: "#198155",
    },
    { label: "Sad", value: "Sad", bgColor: "#E7E5FC", textColor: "#281981" },
    {
      label: "Excited",
      value: "Excited",
      bgColor: "#FCE5F7",
      textColor: "#81197D",
    },
    {
      label: "Stressed",
      value: "Stressed",
      bgColor: "#FCF3E5",
      textColor: "#815E19",
    },
    {
      label: "Hopeful",
      value: "Hopeful",
      bgColor: "#E5FCF9",
      textColor: "#196881",
    },
    {
      label: "Hopeless",
      value: "Hopeless",
      bgColor: "#FCE5E5",
      textColor: "#811919",
    },
    {
      label: "Confused",
      value: "Confused",
      bgColor: "#FCFBE5",
      textColor: "#7F8119",
    },
  ];

  const handleMoodPicker = () => {
    setModalVisible(true);
  };

  const handleMoodSelection = (option) => {
    setCustomMood("");
    setMood(option.value);
    setBgColor(option.bgColor);
    setTextColor(option.textColor);
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
    setMoodBgColorValue(bgColor);
    setMoodTextColorValue(textColor);
    setModalVisible(false);
  };

  const handleCancel = () => {
    if (!value) {
      handleClear();
      setModalVisible(false);
    } else if (value != mood) {
      setMood(value);
      setBgColor(moodBgColorValue);
      setTextColor(moodTextColorValue);
      setModalVisible(false);
    } else {
      setModalVisible(false);
    }
  };

  const handleClear = () => {
    setMood("");
    setCustomMood("");
    setMoodBgColorValue("");
    setMoodTextColorValue("");
    setValue("");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleMoodPicker}
        style={[
          styles.buttonContainer,
          moodBgColorValue !== "" && { backgroundColor: bgColor },
        ]}
      >
        <View style={styles.buttonIcon}>
          {moodTextColorValue !== "" ? (
            <TouchableOpacity onPress={handleClear}>
              <SkinnyIcon
                name="x"
                size={16}
                strokeWidth={1.5}
                color={moodTextColorValue !== "" ? textColor : "#979C9E"}
              />
            </TouchableOpacity>
          ) : (
            <SkinnyIcon
              name="plus"
              size={16}
              strokeWidth={1.5}
              color="#979C9E"
            />
          )}
        </View>
        {value == "" ? (
          <Text style={styles.buttonText}>How are you feeling?</Text>
        ) : (
          <Text style={textColor !== "" && { color: textColor }}>{value}</Text>
        )}
        <View style={styles.buttonIcon}>
          <SkinnyIcon
            name="image"
            size={20}
            strokeWidth={1.5}
            color="transparent"
          />
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={moodstyles.modalContainer}>
          <View style={moodstyles.modalContent}>
            <Text style={moodstyles.modalTitle}>How are you feeling?</Text>
            <View style={moodstyles.modalMoodSelection}>
              {moodOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleMoodSelection(option)}
                  style={[
                    moodstyles.moodOption,
                    { backgroundColor: option.bgColor },
                    moodstyles.moodBorder,
                    mood === option.value && { borderColor: option.textColor },
                  ]}
                >
                  <Text
                    style={[moodstyles.moodText, { color: option.textColor }]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={moodstyles.customMoodInput}
              value={customMood}
              onChangeText={handleCustomMoodSelection}
              placeholder="Or add your own..."
            />

            <View style={moodstyles.modalButtonContainer}>
              <TouchableOpacity
                onPress={handleDone}
                style={moodstyles.doneButton}
              >
                <Text style={moodstyles.doneButtonText}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCancel}
                style={moodstyles.cancelButton}
              >
                <Text style={moodstyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MoodPicker;
