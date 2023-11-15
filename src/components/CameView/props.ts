import { Camera, CameraType } from "expo-camera";

export default interface CameraViewProps {
  type: CameraType;
  onFlipCamera: () => void;
}
