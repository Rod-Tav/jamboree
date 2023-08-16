import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../styles/styles";
import SpotifyScreen from "./screens/SpotifyScreen";
import SkinnyIcon from "react-native-snappy";

const SongPicker = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSongPicker = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSongPicker}
        style={styles.buttonContainer}
      >
        <View style={styles.buttonIcon}>
          <SkinnyIcon
            name="plus"
            size={16}
            strokeWidth={1.5}
            color="#979C9E"
            padding={10}
          />
          <Text style={styles.buttonText}>Add a song</Text>
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
        <SpotifyScreen setModalVisible={setModalVisible} />
      </Modal>
    </View>
  );
};
export default SongPicker;
