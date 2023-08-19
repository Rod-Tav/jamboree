import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  Appearance,
  useColorScheme,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import ImagePickerScreen from "../ImagePickerScreen";
import MoodPicker from "../MoodPicker";
import SongPicker from "../SongPicker";
import SkinnyIcon from "react-native-snappy";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const CreateScreen = () => {
  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [moodBgColor, setMoodBgColor] = useState("");
  const [moodTextColor, setMoodTextColor] = useState("");
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songImage, setSongImage] = useState("");
  const [songLink, setSongLink] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const navigation = useNavigation();
  const [clearMoodToggle, setClearMoodToggle] = useState(false);
  const [clearSongToggle, setClearSongToggle] = useState(false);
  const route = useRoute();
  const editThought = route.params?.editThought;

  const formatDate = () => {
    const date = new Date();
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const formattedDate = year + "-" + month + "-" + day;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  useEffect(() => {
    const blurListener = navigation.addListener("blur", () => {
      if (editThought) {
        // Reset the editThought parameter when navigating away
        route.params.editThought = false;
        setTitle("");
        setContent("");
        setMood("");
        setMoodBgColor("");
        setMoodTextColor("");
        setSongName("");
        setSongArtist("");
        setSongImage("");
        setSongLink("");
        setImageSources([]);
      }
    });

    const focusListener = navigation.addListener("focus", () => {
      if (editThought) {
        // Initialize fields with editThought data if available
        setTitle(editThought.title);
        setContent(editThought.content);
        setMood(editThought.mood);
        setMoodBgColor(editThought.moodBgColor);
        setMoodTextColor(editThought.moodTextColor);
        setImageSources(editThought.imageSources);
        if (editThought.songName) {
          setSongName(editThought.songName);
          setSongArtist(editThought.songArtist);
          setSongImage(editThought.songImage);
          setSongLink(editThought.songLink);
        }
      }
    });

    return () => {
      blurListener();
      focusListener();
    };
  }, [editThought, navigation, route.params]);

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  // Save image to file system
  const saveImage = async (uri) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpeg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  };

  const storeImages = async (images) => {
    const updatedImages = [];

    for (const image of images) {
      const newDest = await saveImage(image.uri);
      updatedImages.push({ ...image, uri: newDest });
    }

    return updatedImages;
  };

  const handleAddThought = async () => {
    const formattedDate = formatDate();

    const newImageSources = await storeImages(imageSources);

    const newThought = {
      id: route.params?.editThought?.id || new Date().getTime().toString(),
      title,
      content,
      mood,
      moodBgColor,
      moodTextColor,
      songName,
      songArtist,
      songImage,
      songLink,
      imageSources: newImageSources,
      date: route.params?.editThought?.date || formattedDate.date, // Use the original date when editing
      time: route.params?.editThought?.time || formattedDate.time, // Use the original time when editing
    };
    if (
      newThought.title == "" &&
      newThought.content == "" &&
      newThought.mood == "" &&
      newThought.songName == "" &&
      newThought.imageSources.length == 0
    ) {
      return;
    }
    try {
      const existingThoughts = await AsyncStorage.getItem("THOUGHTS");
      const thoughts = existingThoughts ? JSON.parse(existingThoughts) : {};

      if (route.params?.editThought) {
        // If editing, find the thought and update it
        const thoughtDate = route.params.editThought.date;
        const thoughtId = route.params.editThought.id;

        if (thoughts[thoughtDate]) {
          thoughts[thoughtDate] = thoughts[thoughtDate].map((thought) =>
            thought.id === thoughtId ? newThought : thought
          );
        }
      } else {
        // If not editing, add a new thought
        if (!thoughts[newThought.date]) {
          thoughts[newThought.date] = [];
        }

        thoughts[newThought.date].unshift(newThought);
      }

      await AsyncStorage.setItem("THOUGHTS", JSON.stringify(thoughts));

      // Reset all states after successfully saving the thought
      setTitle("");
      setContent("");
      setMood("");
      setMoodBgColor("");
      setMoodTextColor("");
      setSongName("");
      setSongArtist("");
      setSongImage("");
      setSongLink("");

      setImageSources([]);
      setClearMoodToggle(!clearMoodToggle);
      setClearSongToggle(!clearSongToggle);
      navigation.navigate("TrueHome"); // Navigate back to home screen
    } catch (error) {
      console.error("Error saving thought:", error);
    }
  };

  const changeImageSources = (newImageSources) => {
    setImageSources(newImageSources);
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, dark && { backgroundColor: "#535353" }]}>
      <View style={[styles.container, dark && { backgroundColor: "#2B2B2B" }]}>
        <KeyboardAvoidingView behavior={"padding"}>
          <ScrollView
            style={{
              backgroundColor: dark ? "#2B2B2B" : "white",
              height: "100%",
            }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={[
                  styles.createContainer,
                  { paddingBottom: 14 },
                  dark && { backgroundColor: "#2B2B2B" },
                ]}
              >
                {editThought ? (
                  <View style={styles.headerStyle}>
                    <Text
                      style={[styles.headerText, dark && { color: "white" }]}
                    >
                      Edit your thought
                    </Text>
                  </View>
                ) : (
                  <View style={styles.headerStyle}>
                    <Text
                      style={[styles.headerText, dark && { color: "white" }]}
                    >
                      What's on your mind?
                    </Text>
                  </View>
                )}

                {/* Styled ImagePickerScreen */}
                <View>
                  <ImagePickerScreen
                    imageSources={imageSources}
                    changeImageSources={changeImageSources}
                  />
                </View>

                {/* Title Input */}
                <TextInput
                  style={[
                    styles.titleInput,
                    dark && {
                      color: "white",
                      backgroundColor: "#535353",
                      borderColor: "#535353",
                    },
                  ]}
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  placeholder="Title"
                  placeholderTextColor={dark ? "#979C9E" : "#E3E5E5"}
                  maxLength={50}
                />

                {/* Content Input */}
                <TextInput
                  style={[
                    styles.contentInput,
                    dark && {
                      color: "white",
                      backgroundColor: "#535353",
                      borderColor: "#535353",
                    },
                  ]}
                  onChangeText={(text) => setContent(text)}
                  value={content}
                  placeholder="Write your thoughts here..."
                  placeholderTextColor={dark ? "#979C9E" : "#E3E5E5"}
                  multiline
                />

                {/* Mood Picker */}
                <View>
                  <MoodPicker
                    value={mood}
                    setValue={(mood) => setMood(mood)}
                    moodBgColorValue={moodBgColor}
                    setMoodBgColorValue={(bgColor) => setMoodBgColor(bgColor)}
                    moodTextColorValue={moodTextColor}
                    setMoodTextColorValue={(textColor) =>
                      setMoodTextColor(textColor)
                    }
                    clearMoodToggle={clearMoodToggle}
                  />
                </View>
                {/* Spotify */}
                <View>
                  <SongPicker
                    songName={songName}
                    setSongName={(name) => setSongName(name)}
                    songArtist={songArtist}
                    setSongArtist={(artist) => setSongArtist(artist)}
                    songImage={songImage}
                    setSongImage={(image) => setSongImage(image)}
                    songLink={songLink}
                    setSongLink={(link) => setSongLink(link)}
                    clearSongToggle={clearSongToggle}
                  />
                </View>

                {/* Styled Add Thought Button */}
                <TouchableOpacity
                  onPress={handleAddThought}
                  style={styles.addButton}
                >
                  <SkinnyIcon
                    name="check"
                    size={16}
                    strokeWidth={1.5}
                    color="white"
                    style={styles.buttonIcon}
                  />
                  {editThought ? (
                    <Text style={styles.addButtonText}>Save Edits</Text>
                  ) : (
                    <Text style={styles.addButtonText}>Log Your Thought</Text>
                  )}
                  <SkinnyIcon
                    name="check"
                    size={24}
                    strokeWidth={1.5}
                    color="transparent"
                    style={styles.buttonIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;
