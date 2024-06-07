import { StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { Button, H1, H3, SizableText, Input, XStack, YStack, Text, Slider } from "tamagui";
import { Download, History } from "@tamagui/lucide-icons";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { View, ScrollView } from "./Themed";
import { styled } from "@tamagui/core";

import { useData } from "@/contexts/DataContext";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "react-native";
import { useState } from "react";
import { Loader } from "./Loader";
import { Summary } from "./Summary";
import { RECO } from "@/constants/Common";
import { ImageResponse } from "@/services/types";
import { router } from "expo-router";
import { Tooltip } from "./Tooltip";

const FloatingButton = styled(Button, {
  name: "Floating Button",
  flex: 1,
  position: "absolute",
  alignSelf: "flex-end",
});

export interface ClassCounts {
  healthy?: number;
  initial?: number;
  moderate?: number;
  extensive?: number;
  unknown?: number;
}

type ResultProps = {
  imgUri: string | null;
  summary: ClassCounts
  extreme?: string
  imageResponse: ImageResponse
  handleVisibility?: () => void
  children?: React.ReactElement
};

export const ResultView = ({ 
  imgUri,
  summary, 
  children, extreme="none", 
  imageResponse, 
  handleVisibility }: ResultProps
) => {
  const { save } = useData();
  const [isViewerVisible, setViewerVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("Untitled")
  const [opacity, setOpacity] = useState(0.0)
  const [originalVisible, setOriginalVisible] = useState(false)

  const today = new Date();

  const saveToHistory = async () => {
    setLoading(true)
    setMessage("Saving to history...")
    const id = await save!({
      imgUri: imgUri!,
      title,
      summary,
      extreme,
      ...imageResponse
    })
    Alert.alert('Result saved to history.')
    setLoading(false)
    setMessage("")
    handleVisibility!()
    router.navigate({
      pathname: '/result',
      params: { id: id }
    })
  }

  const handleViewer = () => {
    setViewerVisible(!isViewerVisible)
  }

  const saveImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera roll access is required to save images.");
      return;
    }
    // Download file to temporary cache
    const { uri } = await FileSystem.downloadAsync(
      imgUri!,
      FileSystem.cacheDirectory + "result.jpg"
    );

    // Save Image to Camera Roll
    await MediaLibrary.saveToLibraryAsync(uri);

    // Delete cached temp
    await FileSystem.deleteAsync(uri);
    Alert.alert("Image result saved to Camera Roll");
  };

  const images = [
    { url: imgUri! },
  ]

  const PLACEHOLDER = "https://i.postimg.cc/FFcjKg98/placeholder.png";
  return (
    <>
      <H1 paddingVertical="$5">Analysis result</H1>
      <View style={styles.preview}>
        <TouchableOpacity onPress={handleViewer}>
          <Image
            source={{ uri: imgUri ? imgUri : PLACEHOLDER }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      <Modal visible={isViewerVisible} transparent={true}>
        <View style={{flex: 1}}>
        <ImageViewer 
          imageUrls={images}
          renderImage={(props) => {
            return (
              <>
              <Image {...props} />
              <Image 
                style={{ width: '100%', height: '100%', position: "absolute", left: 0, right: 0, opacity: opacity }} 
                source={{ uri: `https://api.carident.live/${imageResponse.originalImagePath}` }}  
              />
              </>
            )
          }} 
        />
          <Slider margin="$4" value={[opacity]} max={1} onValueChange={(val) => setOpacity(val[0])} step={0.01}>
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular elevate size="$2" />
          </Slider>
          <Button margin="$6" onPress={handleViewer}>Close</Button>
          <Button position="absolute" right={0} marginTop="$10" onPress={() => setOpacity(opacity === 0 ? 1 : 0)}>
            {opacity === 0 ? "Show Original" : "Hide Original"}
          </Button>
        </View>
      </Modal>
        <FloatingButton icon={Download} onPress={saveImage}>
        </FloatingButton>
      </View>
      <XStack alignItems="center" gap="$2" paddingTop="$3">
        <H3>Summary</H3>
        <Tooltip text="what's this" />
      </XStack>
      <Summary counts={summary}  />
      <SizableText marginTop="$2">Insights & Recommendations</SizableText>
      <YStack padding="$3" backgroundColor="$gray1" borderRadius={10}>
        <SizableText>{RECO[extreme]}</SizableText>
      </YStack>
      <SizableText theme="alt1" paddingTop="$1.5">General Information</SizableText>
      <XStack alignItems="center">
        <SizableText theme="alt2">{`title `}</SizableText>
        <Input size="$1" flex={1} placeholder="Untitled" onChangeText={t => setTitle(t)}/>
      </XStack>
      <XStack>
        <SizableText theme="alt2">{`date taken `}</SizableText>
        <SizableText>{`${today.toLocaleString()}`}</SizableText>
      </XStack>
      <H3 paddingTop={'$3'}>Actions</H3>
      <Button onPress={saveToHistory} icon={History} marginVertical="$2">
        Save to History
      </Button>
      { children }
      { loading && <Loader message={message} /> }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  preview: {
    backgroundColor: "black",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: "white",
    borderWidth: 1
  },
});
