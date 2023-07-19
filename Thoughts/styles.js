import { StyleSheet } from "react-native";

const viewPadding = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    padding: 5,
    width: "30%",
    justifyContent: "center",
  },
  titleInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  moodInput: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  contentInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    marginBottom: 10,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#2196F3",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    paddingVertical: viewPadding,
  },
  noteContainer: {
    backgroundColor: "#F0F0F0",
    padding: viewPadding,
    marginBottom: viewPadding,
  },
  noteImage: {
    width: "100%",
    height: 200,
    marginBottom: viewPadding,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: viewPadding / 2,
  },
  noteContent: {
    fontSize: 16,
  },
  noteMood: {
    fontSize: 14,
    color: "#888888",
    marginBottom: viewPadding / 2,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  headerStyle: {
    height: 50,
    marginVertical: 10,
    width: "100%",
  },
});
