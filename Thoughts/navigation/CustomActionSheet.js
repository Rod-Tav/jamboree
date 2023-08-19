import React from "react";
import { View, TouchableOpacity, Text, Appearance } from "react-native";
import SkinnyIcon from "react-native-snappy";
import Modal from "react-native-modal";
import styles from "../styles/styles";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const CustomActionSheet = ({ isVisible, onCancel, onSelectOption }) => {
  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";
  const handleOptionPress = (option) => {
    onSelectOption(option);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropTransitionOutTiming={0}
      style={styles.modalContentContainer}
    >
      <View
        style={[styles.modalContent, dark && { backgroundColor: "#2b2b2b" }]}
      >
        <TouchableOpacity
          onPress={() => handleOptionPress("Take a Photo")}
          style={styles.optionButton}
        >
          <SkinnyIcon
            name="camera"
            size={24}
            strokeWidth={1.25}
            color={dark ? "white" : "#979C9E"}
            style={styles.icon}
          />
          <Text style={[styles.optionButtonText, dark && { color: "white" }]}>
            Take a Photo
          </Text>
          <SkinnyIcon
            name="camera"
            size={24}
            strokeWidth={1.25}
            color="transparent"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionPress("Choose from Library")}
          style={styles.optionButton}
        >
          <SkinnyIcon
            name="image"
            size={24}
            strokeWidth={1.25}
            color={dark ? "white" : "#979C9E"}
            style={styles.icon}
          />
          <Text style={[styles.optionButtonText, dark && { color: "white" }]}>
            Choose from Library
          </Text>
          <SkinnyIcon
            name="image"
            size={24}
            strokeWidth={1.25}
            color="transparent"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={styles.optionButton}>
          <SkinnyIcon
            name="x"
            size={24}
            strokeWidth={1.25}
            color={dark ? "white" : "#979C9E"}
            style={styles.icon}
          />
          <Text style={[styles.optionButtonText, dark && { color: "white" }]}>
            Cancel
          </Text>
          <SkinnyIcon
            name="x"
            size={24}
            strokeWidth={1.25}
            color="transparent"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomActionSheet;
