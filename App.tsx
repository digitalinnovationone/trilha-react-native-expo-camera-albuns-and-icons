import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import CameraView from "./src/components/CameView";

export default function App() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCamerapermission] =
    useState<boolean>(false);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCamerapermission(status === "granted");
      console.log("acesso a camera", status);
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === "granted");
      console.log("acesso a biblioteca", status);
    })();
  }, []);

  const flipCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasCameraPermission === false || null) {
    return (
      <View>
        <Text>Não tem permissão de Camera.</Text>
      </View>
    );
  }

  if (hasMediaPermission === false || null) {
    return (
      <View>
        <Text>Não tem permissão de mídia.</Text>
      </View>
    );
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
