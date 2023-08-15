import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    height: "100%",
    flexGrow: 1,

    backgroundColor: "white",
    // paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: "7%",
    borderRadius: 16,
  },
  scrollContainer: {
    display: "flex",
    height: "90%",
    flexDirection: "column",
    gap: 20,
    alignContent: "space-between",
  },
  image: {
    width: "70%",
  },
  calendar: {},

  search: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F2F4F5",
    padding: 10,
    borderRadius: 8,
    gap: 10,
  },
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  searchText: { color: "#979C9E", fontSize: 16 },
});
