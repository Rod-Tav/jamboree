import { StyleSheet } from "react-native";

const viewPadding = 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    // paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: "7%",
    borderRadius: 16,
  },
  createContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: "white",
    // paddingTop: 24,
    paddingBottom: 16,
    borderRadius: 16,
  },
  topOfHome: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerStyle: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#F2F2F2",
    textAlign: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonContainer2: {
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#F2F2F2",
    textAlign: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonIcon: {
    justifyContent: "center",
  },
  buttonIcon2: {
    justifyContent: "center",
  },
  buttonText: {
    color: "#979C9E",
    fontWeight: "400",
    fontSize: 16,
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonText2: {
    color: "#979C9E",
    fontWeight: "400",
    fontSize: 12,
    display: "flex",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  imagesEntireContainer: {
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageContainer: {},
  imageWrapper: {
    width: 300,
    height: 200,
    borderRadius: 0,
    overflow: "hidden",
  },
  imageWrapperHome: {
    aspectRatio: 4 / 3,
    borderRadius: 16,
    overflow: "hidden",
    maxWidth: "100%",
  },
  imageWrapperHome2: {
    overflow: "hidden",
    maxWidth: "100%",
    objectFit: "cover",
    borderRadius: 16,
  },
  imageHome: {
    flex: 1,
  },
  homeBackground: {
    width: "100%",
    height: "49%",
  },
  image: {
    flex: 1,
  },
  titleInput: {
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
  contentInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 8,
    padding: 16,
    paddingTop: 16,
    minHeight: 100,
    fontStyle: "normal",
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
    color: "#090A0A",
  },
  addButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 48,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#2F80ED",
    textAlign: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    overflow: "visible",
  },

  dayText: {
    fontSize: 15,
    color: "#4F4F4F",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 3,
    textTransform: "uppercase",
  },

  thoughtContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F5",
    gap: 14,
    paddingTop: 16,
    paddingBottom: 16,

    display: "flex",
    flexDirection: "column",
    // padding: viewPadding,
    // marginBottom: viewPadding,
  },
  thoughtTimeAndMoodAndText: { display: "flex", gap: 10 },
  thoughtTimeAndMood: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  thoughtTime: {
    fontSize: 12,
    color: "#4F4F4F",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
  thoughtImage: {
    width: "100%",
    borderRadius: 8,
    height: 200,
    marginBottom: viewPadding,
  },
  thoughtTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  thoughtTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#090A0A",
    // marginBottom: 10,
  },
  thoughtContent: {
    color: "#090A0A",
    fontSize: 12,
    fontWeight: "300",
  },
  thoughtMood: {
    fontSize: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  deleteButton: {
    display: "none",
  },
  bottomSheetContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  bottomSheetOption: {
    fontSize: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  detailContainer: {
    height: "100%",
    backgroundColor: "white",
    paddingTop: "2%",
    paddingBottom: 16,
    paddingLeft: "7%",
    paddingRight: "7%",
  },

  detailTimeAndMood: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F5",
    paddingBottom: 12,
  },
  detailThoughtContent: {
    color: "#090A0A",
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Show the modal at the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },

  optionButton: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#828282",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Changed from alignContent to alignItems
    height: "100%",
    marginTop: 2,
  },

  modalContentContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingBottom: 35,
    paddingHorizontal: 20,
    opacity: 1, // Adjust the opacity of the modal content
  },

  leftarrow: {
    paddingHorizontal: 10000,
  },
});
