import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../styles/styles";
import Icon from "react-native-vector-icons/AntDesign";
import ImageViewing from "react-native-image-viewing";
import { useCallback } from "react";
import Modal from "react-native-modal";
import SkinnyIcon from "react-native-snappy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { TextInput } from "react-native-gesture-handler";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Set the title of the header
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        display: "none",
      },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: "14%" }}
        >
          <SkinnyIcon
            name="arrow-left"
            size={25}
            strokeWidth={1.5}
            color="#090A0A"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        placeholder="Search your thoughts..."
        value={query}
        onChangeText={setQuery}
        multiline={true}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
