import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

import CameraView from "./src/components/CameView";

export default function App() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHaspermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === "granted");
      console.log(status);
    })();
  }, []);

  const flipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasPermission === false || null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CameraView type={type} onFlipCamera={flipCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
  },
});
