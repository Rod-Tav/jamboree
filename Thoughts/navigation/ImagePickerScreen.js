import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Dimensions,
  Appearance,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import SkinnyIcon from "react-native-snappy";
import ImageViewing from "react-native-image-viewing";
import styles from "../styles/styles";
import CustomActionSheet from "./CustomActionSheet";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import * as FileSystem from "expo-file-system";

const ImagePickerScreen = ({ imageSources, changeImageSources }) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageHeights, setImageHeights] = useState({});

  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";
  useEffect(() => {
    // Calculate image heights when imageSources change
    const newImageHeights = imageSources.reduce((heights, image) => {
      heights[image.uri] =
        (Dimensions.get("window").width / image.width) * image.height;
      return heights;
    }, {});

    setImageHeights(newImageHeights);
  }, [imageSources]);

  const handleImagePress = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsImageViewVisible(true);
  };

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
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user took a photo, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImageSources(result.assets);
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
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user selected images, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImageSources(result.assets);
      } else {
        setShowCustomActionSheet(false);
      }
    }
  };

  const closeImageView = () => {
    setIsImageViewVisible(false);
  };

  let currentPos = 0;
  const snapOffsets = imageSources.map((image, index) => {
    const aspectRatio = image.width / image.height;
    const offset = currentPos;
    currentPos += 200 * aspectRatio;
    return offset;
  });

  const handleImageLoad =
    (imageUri) =>
    ({ nativeEvent }) => {
      const { width, height } = nativeEvent.source;
      const aspectRatio = width / height;
      setImageHeights((prevImageHeights) => ({
        ...prevImageHeights,
        [imageUri]: aspectRatio,
      }));
    };

  return (
    <View>
      {imageSources.length !== 0 && (
        <View
          style={[
            styles.imagesEntireContainer,
            dark && { backgroundColor: "#2b2b2b" },
          ]}
        >
          {imageSources.length > 1 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              centerContent={true}
              contentContainerStyle={styles.imageContainer}
              pagingEnabled={true}
              snapToOffsets={snapOffsets}
            >
              {imageSources.map((image, index) => {
                const aspectRatio = image.width / image.height;
                const imageWidth = 200 * aspectRatio;
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    key={image.uri}
                    onPress={() => handleImagePress(index)}
                  >
                    <View style={[styles.imageWrapper, { width: imageWidth }]}>
                      <Image
                        source={{
                          uri: `${FileSystem.documentDirectory}images/${
                            image.uri.split("images/")[1]
                          }`,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              key={imageSources[0].uri}
              onPress={() => handleImagePress(0)}
            >
              <View
                style={[
                  styles.imageWrapperHome,
                  {
                    aspectRatio: imageHeights[imageSources[0].uri]
                      ? imageHeights[imageSources[0].uri]
                      : 1, // Use 1 as the default aspect ratio if not loaded yet
                  },
                ]}
              >
                <Image
                  source={{
                    uri: `${FileSystem.documentDirectory}images/${
                      imageSources[0].uri.split("images/")[1]
                    }`,
                  }}
                  style={styles.imageHome}
                  resizeMode="cover"
                  onLoad={handleImageLoad(imageSources[0].uri)}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View>
        <TouchableOpacity
          onPress={handleAddImagesPress}
          style={[
            styles.buttonContainer,
            dark && { backgroundColor: "#535353" },
          ]}
        >
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="image"
              size={24}
              strokeWidth={1.25}
              color="#979C9E"
            />
          </View>
          <Text style={styles.buttonText}>Add Images...</Text>
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
      <ImageViewing
        images={imageSources.map((image) => ({ uri: image.uri }))}
        imageIndex={selectedImageIndex}
        visible={isImageViewVisible}
        onRequestClose={closeImageView}
      />
      <CustomActionSheet
        isVisible={showCustomActionSheet}
        onCancel={handleCancelCustomActionSheet}
        onSelectOption={handleSelectOption}
      />
    </View>
  );
};

export default ImagePickerScreen;
