import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "react-native";
import { Button } from "tamagui";
import { Platform } from "react-native";
import { View } from "./Themed";

interface ImgModalViewerProps {
  isVisible: boolean;
  handleVisible: () => void;
  images: IImageInfo[];
}

export const ImgModalViewer = ({
  isVisible,
  handleVisible,
  images,
}: ImgModalViewerProps) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={{ paddingTop: Platform.OS === 'ios' ? 15 : 0}}/>
      <ImageViewer imageUrls={images}/>
      <Button onPress={handleVisible}>Close</Button>
    </Modal>
  );
};
