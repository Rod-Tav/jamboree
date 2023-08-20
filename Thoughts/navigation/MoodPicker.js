import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Appearance,
} from "react-native";
import moodstyles from "../styles/moodstyles";
import styles from "../styles/styles";
import SkinnyIcon from "react-native-snappy";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const MoodPicker = ({
  value,
  setValue,
  moodBgColorValue,
  setMoodBgColorValue,
  moodTextColorValue,
  setMoodTextColorValue,
  clearMoodToggle,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mood, setMood] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [customMood, setCustomMood] = useState("");
  const [customColor, setCustomColor] = useState("");
  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";
  const colorOrder = [6, 4, 7, 1, 5, 2, 3];

  useEffect(() => {
    setMood("");
    setBgColor("");
    setTextColor("");
    setCustomMood("");
    setCustomColor("");
    setMoodBgColorValue("");
    setMoodTextColorValue("");
  }, [clearMoodToggle]);

  const moodOptions = [
    {
      label: "Happy",
      value: "Happy",
      bgColor: "#DCFFCD",
      textColor: "#198155",
    },
    {
      label: "Sad",
      value: "Sad",
      bgColor: "#DCD9FF",
      textColor: "#281981",
    },
    {
      label: "Excited",
      value: "Excited",
      bgColor: "#FFD4F6",
      textColor: "#81197D",
    },
    {
      label: "Stressed",
      value: "Stressed",
      bgColor: "#FFE9C7",
      textColor: "#815E19",
    },
    {
      label: "Hopeful",
      value: "Hopeful",
      bgColor: "#C9FFF9",
      textColor: "#196881",
    },
    {
      label: "Angry",
      value: "Angry",
      bgColor: "#FFCECE",
      textColor: "#811919",
    },
    {
      label: "Anxious",
      value: "Anxious",
      bgColor: "#FFFDCB",
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
    setCustomColor("");
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  };

  const handleCustomMoodSelection = (selectedValue) => {
    setCustomMood(selectedValue);
    setMood("");
  };

  const handleDone = () => {
    if (!mood && !customMood) return;
    if (customMood && !customColor) return;
    setValue(mood || customMood);
    setMoodBgColorValue(bgColor);
    setMoodTextColorValue(textColor);
    setModalVisible(false);
  };

  const handleSelectColor = (option) => {
    setBgColor(option.bgColor);
    setMood("");
    setCustomColor(option.textColor);
    setTextColor(option.textColor);
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
    setCustomColor("");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleMoodPicker}
        style={[
          styles.buttonContainer,
          dark && moodBgColorValue == "" && { backgroundColor: "#535353" },
          moodBgColorValue !== "" && { backgroundColor: moodBgColorValue },
        ]}
      >
        <View style={styles.buttonIcon}>
          {moodTextColorValue !== "" ? (
            <View style={styles.buttonIcon}>
              <SkinnyIcon
                name="image"
                size={20}
                strokeWidth={1.5}
                color="transparent"
              />
            </View>
          ) : (
            <SkinnyIcon
              name="plus"
              size={16}
              strokeWidth={1.5}
              color="#979C9E"
              padding={10}
            />
          )}
        </View>
        {value == "" ? (
          <Text style={styles.buttonText}>How are you feeling?</Text>
        ) : (
          <View>
            <Text
              style={
                moodTextColorValue !== "" && [
                  moodstyles.moodTextMain,
                  { color: moodTextColorValue },
                ]
              }
            >
              {value}
            </Text>
          </View>
        )}
        <View style={styles.buttonIcon}>
          {moodTextColorValue !== "" ? (
            <TouchableOpacity onPress={handleClear}>
              <SkinnyIcon
                name="x"
                size={16}
                strokeWidth={1.5}
                color={
                  moodTextColorValue !== "" ? moodTextColorValue : "#979C9E"
                }
              />
            </TouchableOpacity>
          ) : (
            <SkinnyIcon
              name="plus"
              size={16}
              strokeWidth={1.5}
              color="transparent"
              padding={10}
            />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropTransitionOutTiming={10}
        style={styles.modalContentContainer}
      >
        <View style={moodstyles.modalContainer}>
          <View
            style={[
              moodstyles.modalContent,
              dark && { backgroundColor: "#2B2B2B" },
            ]}
          >
            <Text style={[moodstyles.modalTitle, dark && { color: "white" }]}>
              How are you feeling?
            </Text>
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
              style={[
                moodstyles.customMoodInput,
                dark && {
                  color: "white",
                  backgroundColor: "#535353",
                  borderColor: "#535353",
                },
              ]}
              value={customMood}
              onChangeText={handleCustomMoodSelection}
              placeholder="Or add your own..."
              placeholderTextColor={dark ? "#979C9E" : "#E3E5E5"}
              autoCorrect={false}
            />
            {/* Color selection buttons */}
            <View style={moodstyles.customColorContainer}>
              {colorOrder.map((index) => {
                const option = moodOptions[index - 1];
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelectColor(option)}
                    style={[
                      moodstyles.customColorButton,
                      { backgroundColor: option.bgColor },
                      moodstyles.moodBorder,
                      customColor === option.textColor && {
                        borderColor: option.textColor,
                      },
                    ]}
                  ></TouchableOpacity>
                );
              })}
            </View>
            <View style={moodstyles.modalButtonContainer}>
              <TouchableOpacity
                onPress={handleDone}
                style={moodstyles.doneButton}
              >
                <Text style={moodstyles.doneButtonText}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCancel}
                style={[
                  moodstyles.cancelButton,
                  dark && { backgroundColor: "#2b2b2b" },
                ]}
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
