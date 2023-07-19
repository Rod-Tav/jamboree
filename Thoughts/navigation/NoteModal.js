import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const NoteModal = ({ visible, onClose, note }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {note.imageUri && (
          <Image
            source={{ uri: note.imageUri }}
            style={styles.noteImage}
            onError={() => console.warn("Failed to load image")}
          />
        )}
        <Text style={styles.noteMood}>Mood: {note.mood}</Text>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text style={styles.noteContent}>{note.content}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "blue",
  },
  noteImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  noteMood: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 16,
  },
});

export default NoteModal;
