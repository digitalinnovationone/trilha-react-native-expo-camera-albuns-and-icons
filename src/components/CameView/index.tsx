import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";

import { Camera, FlashMode, ImageType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./styles";
import CameraViewProps from "./props";

export default function CameraView({ type, onFlipCamera }: CameraViewProps) {
  const camRef = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  async function takePicture() {
    const options = { quality: 1, imageType: ImageType.png };

    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync(options);
      setCapturedPhoto(data.uri);
      setModalIsOpen(true);
    }
  }

  async function savePicture() {
    if (capturedPhoto !== null) {
      await saveToAlbum(capturedPhoto, "hotwheels");
      // MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() => {
      //   setCapturedPhoto(null);
      // });
    }
  }

  async function saveToAlbum(uri: string, album: string) {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync(album, asset);
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
          <FontAwesome5 name="sync" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.takePhoto} onPress={takePicture}>
          <FontAwesome5 name="camera" size={40} color="#fff" />
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => {
                  setModalIsOpen(false);
                }}
              >
                <FontAwesome5 name="times" size={40} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={{ margin: 10 }} onPress={savePicture}>
                <FontAwesome5 name="sd-card" size={40} color="#000" />
              </TouchableOpacity>
            </View>
            <Image
              style={{ width: "100%", height: 450, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </Camera>
  );
}
