import { StyleSheet } from "react-native";

const viewPadding = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: "7%",
    paddingRight: "7%",
    marginTop: 44,
    borderRadius: 16,
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
    borderColor: "#E3E5E5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    backgroundColor: "white",
    fontStyle: "normal",
    lineHeight: 16,
  },
  moodInput: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F2F2F2",
    color: "#979C9E",
    textAlign: "center",
    alignItems: "flex-start",
  },
  contentInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 8,
    padding: 16,
    paddingTop: 16,
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 5,
  },
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});
