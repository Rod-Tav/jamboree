import { StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moodOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedMoodOption: {
    backgroundColor: "lightgrey",
  },
  customMoodInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  doneButton: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginVertical: 5,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 5,
    marginVertical: 5,
  },
});
