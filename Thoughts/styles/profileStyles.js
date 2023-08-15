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
  container2: {
    height: "100%",
    flexGrow: 1,

    backgroundColor: "white",
    // paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: "0%",
    borderRadius: 16,
  },
  scrollContainer: {
    display: "flex",
    height: "90%",
    flexDirection: "column",
    gap: 20,
    alignContent: "space-between",
  },
  editProfileView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    gap: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F5",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  icon: {
    display: "flex",
    flexDirection: "row",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  textInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    gap: -10,
  },
  name: { fontWeight: "700", fontSize: 20 },
  bio: { fontWeight: "300", fontSize: 14 },
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
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F2F4F5",

    padding: 10,
    borderRadius: 8,
    gap: 10,
    marginBottom: 16,
    marginTop: 5,
  },
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  xIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  searchText: { color: "#979C9E", fontSize: 16 },
  searchText2: { color: "#131214", fontSize: 16, padding: 0 },
});
