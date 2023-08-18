import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  useColorScheme,
} from "react-native";
import styles from "../../styles/styles";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageViewing from "react-native-image-viewing";
import { useCallback } from "react";
import Modal from "react-native-modal";
import SkinnyIcon from "react-native-snappy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

const DetailScreen = ({ route }) => {
  const dark = useColorScheme() === "dark";
  const { thought } = route.params;
  const navigation = useNavigation();
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const [showCustomActionSheet, setShowCustomActionSheet] = useState(false);
  const handleImagePress = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsImageViewVisible(true);
  };
  const closeImageView = () => {
    setIsImageViewVisible(false);
  };

  const handleMore = () => {
    setShowCustomActionSheet(true);
  };

  const handleEdit = useCallback(() => {
    navigation.navigate("Create", { editThought: thought });
    setShowCustomActionSheet(false);
  }, [navigation, thought]);

  const deleteThought = async () => {
    const thoughtsNotParsed = await AsyncStorage.getItem("THOUGHTS");
    const thoughts = JSON.parse(thoughtsNotParsed);
    const thoughtId = thought.id;
    try {
      // Find the date associated with the thoughtId
      const thoughtDate = Object.keys(thoughts).find((date) =>
        thoughts[date].some((thought) => thought.id === thoughtId)
      );

      if (!thoughtDate) {
        // If thoughtDate is not found, the thoughtId doesn't exist
        console.warn("Thought not found.");
        return;
      }

      for (const image of thought.imageSources) {
        await FileSystem.deleteAsync(image.uri);
      }

      // Filter out the thought to be deleted from the thoughts array for the specific date
      const updatedThoughts = thoughts[thoughtDate].filter(
        (thought) => thought.id !== thoughtId
      );

      // If the updatedThoughts array is empty, remove the date key from the thoughts object
      if (updatedThoughts.length === 0) {
        delete thoughts[thoughtDate];
      } else {
        // Otherwise, update the thoughts object with the new array
        thoughts[thoughtDate] = updatedThoughts;
      }

      // Save the updated 'thoughts' object to AsyncStorage
      await AsyncStorage.setItem("THOUGHTS", JSON.stringify(thoughts));
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  const formatDate = (date) => {
    const month =
      date.charAt(5) == "0" ? date.substring(6, 7) : date.substring(5, 7);
    const day =
      date.charAt(8) == "0" ? date.substring(9, 10) : date.substring(8, 10);
    const year = date.substring(0, 4);
    return month + "/" + day + "/" + year;
  };

  const handleDeleteModal = () => {
    setShowCustomActionSheet(false);
    return Alert.alert("Delete your thought?", "This cannot be undone.", [
      { text: "Delete", onPress: handleDelete, style: "destructive" },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleDelete = async () => {
    await deleteThought();
    navigation.goBack();
  };

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Set the title of the header
      headerStyle: {
        backgroundColor: dark ? "#2B2B2B" : "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        display: "none",
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={handleMore}
          style={{ paddingHorizontal: "14%" }}
        >
          <Icon name="ellipsis1" size={24} color={dark ? "white" : "#090A0A"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: "14%" }}
        >
          <SkinnyIcon
            name="arrow-left"
            size={25}
            strokeWidth={1.5}
            color={dark ? "white" : "#090A0A"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, dark]);

  let currentPos = 0;
  const snapOffsets = thought.imageSources.map((image, index) => {
    const aspectRatio = image.width / image.height;
    const offset = currentPos;
    currentPos += 200 * aspectRatio;
    return offset;
  });

  const handleCancelCustomActionSheet = () => {
    setShowCustomActionSheet(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: dark ? "#2B2B2B" : "white", height: "100%" }}
    >
      <View
        style={[styles.detailContainer, dark && { backgroundColor: "#2B2B2B" }]}
      >
        {thought.imageSources.length !== 0 && (
          <View
            style={[
              styles.imagesEntireContainer,
              dark && { backgroundColor: "#2B2B2B" },
            ]}
          >
            {thought.imageSources.length > 1 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                centerContent={true}
                contentContainerStyle={styles.imageContainer}
                pagingEnabled={true}
                snapToOffsets={snapOffsets}
              >
                {thought.imageSources.map((image, index) => {
                  const aspectRatio = image.width / image.height;
                  const imageWidth = 200 * aspectRatio;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      key={image.uri}
                      onPress={() => handleImagePress(index)}
                    >
                      <View
                        style={[styles.imageWrapper, { width: imageWidth }]}
                      >
                        <Image
                          source={{ uri: image.uri }}
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
                key={thought.imageSources[0].uri}
                onPress={() => handleImagePress(0)}
              >
                <View
                  style={[
                    styles.imageWrapperHome,
                    {
                      aspectRatio:
                        thought.imageSources[0].width /
                        thought.imageSources[0].height,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: thought.imageSources[0].uri }}
                    style={styles.imageHome}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.thoughtTimeAndMoodAndText}>
          <View style={styles.thoughtTextContainer}>
            {thought.title == "" ? null : (
              <Text style={[styles.thoughtTitle, dark && { color: "white" }]}>
                {thought.title}
              </Text>
            )}
            <View
              style={[
                styles.detailBorder,
                dark && { borderBottomColor: "gray" },
              ]}
            >
              <View style={styles.detailTimeAndMood}>
                <Text
                  style={[styles.thoughtTime, dark && { color: "lightgrey" }]}
                >
                  {formatDate(thought.date)} - {thought.time}
                </Text>
                {thought.mood ? (
                  <Text
                    style={[
                      styles.thoughtMood,
                      {
                        backgroundColor: thought.moodBgColor,
                        color: thought.moodTextColor,
                      },
                    ]}
                  >
                    {thought.mood}
                  </Text>
                ) : null}
              </View>

              {thought.songName && thought.songName != "" && (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(thought.songLink);
                  }}
                >
                  <View
                    style={[
                      styles.songContainer,
                      dark && { backgroundColor: "#535353" },
                    ]}
                  >
                    <Image
                      source={{ uri: thought.songImage }}
                      style={styles.songImage}
                    />
                    <View style={styles.songTextContainer}>
                      <Text
                        numberOfLines={2}
                        style={[styles.songName2, dark && { color: "white" }]}
                      >
                        {thought.songName}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.songArtist2,
                          dark && { color: "lightgrey" },
                        ]}
                      >
                        {thought.songArtist}
                      </Text>
                    </View>
                    <Ionicons
                      name="play"
                      size={24}
                      height={26}
                      color={dark ? "white" : "#D9D9D9"}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {thought.content == "" ? null : (
              <Text style={[styles.thoughtContent, dark && { color: "white" }]}>
                {thought.content}
              </Text>
            )}
          </View>
        </View>
        <ImageViewing
          images={thought.imageSources.map((image) => ({ uri: image.uri }))}
          imageIndex={selectedImageIndex}
          visible={isImageViewVisible}
          onRequestClose={closeImageView}
        />
        {bottomSheetIndex !== -1 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onPress={closeBottomSheet}
          />
        )}
        <CustomActionSheet
          isVisible={showCustomActionSheet}
          onCancel={handleCancelCustomActionSheet}
          handleEdit={handleEdit}
          handleDeleteModal={handleDeleteModal}
          dark={dark}
        />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const CustomActionSheet = ({
  isVisible,
  onCancel,
  handleEdit,
  handleDeleteModal,
}) => {
  const dark = useColorScheme() === "dark";
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropColor="rgba(0, 0, 0, 0.5)"
      backdropTransitionOutTiming={0}
      style={styles.modalContentContainer}
    >
      <View
        style={[styles.modalContent, dark && { backgroundColor: "#2B2B2B" }]}
      >
        <TouchableOpacity onPress={handleEdit} style={styles.optionButton}>
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="edit"
              size={24}
              strokeWidth={1.5}
              color={dark ? "white" : "#828282"}
            />
          </View>
          <Text style={[styles.optionButtonText, dark && { color: "white" }]}>
            Edit
          </Text>
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="edit"
              size={24}
              strokeWidth={1.5}
              color="transparent"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteModal}
          style={styles.optionButton}
        >
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="trash"
              size={24}
              strokeWidth={1.5}
              color={dark ? "white" : "#828282"}
            />
          </View>
          <Text style={[styles.optionButtonText, dark && { color: "white" }]}>
            Delete
          </Text>
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="trash"
              size={24}
              strokeWidth={1.5}
              color="transparent"
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
