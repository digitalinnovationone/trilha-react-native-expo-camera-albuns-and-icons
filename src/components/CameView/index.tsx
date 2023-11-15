import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { Camera, FlashMode } from "expo-camera";

import styles from "./styles";
import CameraViewProps from "./props";

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  const camRef = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  async function takePicture() {
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setModalIsOpen(true);
    }
  }

  return (
    <Camera
      style={{ flex: 1 }}
      type={type}
      ratio="16:9"
      zoom={0}
      flashMode={FlashMode.off}
      ref={camRef}
    >
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.flipArea} onPress={onFlipCamera}>
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.takePhoto} onPress={takePicture}>
          <Text style={styles.takePhotoText}>Take Picture</Text>
        </TouchableOpacity>
      </View>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={modalIsOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => {
                setModalIsOpen(false);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <Image
              style={{ width: "100%", height: 300, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </Camera>
  );
}
