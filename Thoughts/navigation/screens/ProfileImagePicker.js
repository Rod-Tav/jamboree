import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import SkinnyIcon from "react-native-snappy";
import styles from "../../styles/styles";
import CustomActionSheet from "../CustomActionSheet";

const ProfileImagePicker = ({ image, changeImage }) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const handleAddImagesPress = () => {
    setShowCustomActionSheet(true);
  };

  const [showCustomActionSheet, setShowCustomActionSheet] = useState(false);

  const handleCancelCustomActionSheet = () => {
    setShowCustomActionSheet(false);
  };

  const handleSelectOption = async (option) => {
    if (option === "Take a Photo") {
      const cameraPermissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermissionResult.granted === false) {
        alert("Permission to access the camera is required!");
        setShowCustomActionSheet(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user took a photo, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImage(result.assets[0]);
      } else {
        setShowCustomActionSheet(false);
      }
    } else if (option === "Choose from Library") {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access the camera roll is required!");
        setShowCustomActionSheet(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user selected images, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImage(result.assets[0]);
      } else {
        setShowCustomActionSheet(false);
      }
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={handleAddImagesPress}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="image"
              size={24}
              strokeWidth={1.25}
              color="#979C9E"
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Change Image</Text>
          <View style={styles.buttonIcon2}>
            <Icon
              name="image"
              size={24}
              color="transparent"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CustomActionSheet
        isVisible={showCustomActionSheet}
        onCancel={handleCancelCustomActionSheet}
        onSelectOption={handleSelectOption}
      />
    </View>
  );
};

export default ProfileImagePicker;
