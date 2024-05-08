import { StyleSheet, Image, Alert } from "react-native";
import { Button, H1, H3 } from "tamagui";
import { Download, History } from "@tamagui/lucide-icons";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { View } from "./Themed";
import { styled } from "@tamagui/core";

const FloatingButton = styled(Button, {
  name: "Floating Button",
  flex: 1,
  position: "absolute",
  alignSelf: "flex-end",
});

type ResultProps = {
  imgUri: string | null;
};

export const ResultView = ({ imgUri }: ResultProps) => {
  const saveToHistory = async () => {
    
  };

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

  const PLACEHOLDER = "https://i.postimg.cc/FFcjKg98/placeholder.png";
  return (
    <>
      <H1 paddingTop="$5">Analysis result</H1>
      <View style={styles.preview}>
        <Image
          source={{ uri: imgUri ? imgUri : PLACEHOLDER }}
          style={styles.image}
          resizeMode="contain"
        />
        <FloatingButton icon={Download} onPress={saveImage}>
          Save Image
        </FloatingButton>
      </View>
      <H3>Summary</H3>
      <Button icon={History} marginVertical="$2">
        Save to History
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
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
  },
});
