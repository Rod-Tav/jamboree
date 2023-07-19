import { StyleSheet } from "react-native";

const viewPadding = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  headerStyle: {
    height: 50,
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
