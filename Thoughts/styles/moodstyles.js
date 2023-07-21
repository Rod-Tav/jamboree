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
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: 24,
    paddingTop: 32,
    borderRadius: 16,
    width: "86%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  modalMoodSelection: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "75%",
    gap: 5,
  },
  moodOption: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 16,
  },
  moodText: {
    fontSize: 14,
  },
  moodBorder: {
    borderWidth: "1",
    borderColor: "transparent",
  },
  customMoodInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "white",
    fontStyle: "normal",
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
    color: "#090A0A",
  },
  modalButtonContainer: {
    width: "100%",
    alignItems: "center",
  },
  doneButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    borderRadius: 48,
    padding: 16,
    backgroundColor: "#2F80ED",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    padding: 16,
    marginTop: 12,
    backgroundColor: "white",
  },
  cancelButtonText: {
    color: "#2F80ED",
    fontSize: 16,
    textAlign: "center",
  },
});
