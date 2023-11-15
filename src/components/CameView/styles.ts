import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  takePhoto: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  takePhotoText: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 15,
  },
  flipArea: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  flipText: {
    fontSize: 20,
    marginBottom: 15,
    color: "#FFF",
  },
});

export default styles;
