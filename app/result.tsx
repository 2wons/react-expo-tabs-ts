import { Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Text, View, ScrollView } from "@/components/Themed";
import { Button, XStack, YStack, SizableText, H1, H3 } from "tamagui";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImgModalViewer } from "@/components/ImgModalViewer";

import { History } from "@/contexts/DataContext";
import { Summary } from "@/components/Summary";
import { Input } from "tamagui";
import { StarFull, XCircle, Download } from "@tamagui/lucide-icons";

import * as MediaLibrary from "expo-media-library";

export default function ResultScreen() {
  const [visible, setVisible] = useState(false);
  const params = useLocalSearchParams();
  const { id } = params;

  const [prevtitle, setPrevtitle] = useState<string>();
  const [canSave, setCanSave] = useState(false);
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();
  const [date, setDate] = useState<string>();

  const handleVisible = () => {
    setVisible(!visible);
  };

  const getResult = async () => {
    const JSONHistoryList = await AsyncStorage.getItem("history");
    const history: History = JSON.parse(JSONHistoryList!);

    const { img, timestamp, title } = history[id!.toString()];
    const parseDate = new Date(timestamp);
    setImage(img);
    setTitle(title);
    setPrevtitle(title);
    setDate(parseDate.toLocaleString());
  };

  const saveImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera roll access is required to save images.");
      return;
    }

    // Save Image to Camera Roll
    await MediaLibrary.saveToLibraryAsync(image!);
    Alert.alert("Image result saved to camera roll");
  };

  const removeMe = async () => {};

  useEffect(() => {
    getResult();
  }, []);

  const images = [{ url: image! }];

  const defaultImage = "https://i.postimg.cc/FFcjKg98/placeholder.png";

  return (
    <ScrollView style={styles.container}>
      <SizableText size="$3" theme="alt1">
        Viewing
      </SizableText>
      <H1>{title}</H1>
      <YStack
        backgroundColor={"$background025"}
        justifyContent="center"
        alignItems="center"
      >
        <TouchableOpacity onPress={handleVisible}>
          <Image
            source={{ uri: image ? image : defaultImage }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </YStack>
      <H3 paddingTop="$3">Summary</H3>
      <Summary />
      <XStack justifyContent="space-between" alignItems="center">
        <SizableText theme="alt1" paddingTop="$2">
          General Information
        </SizableText>
      </XStack>
      <XStack alignItems="center">
        <SizableText theme="alt2">{`title `}</SizableText>
        <Input
          size="$1"
          flex={1}
          placeholder={prevtitle}
          onChangeText={(t) => {
            setTitle(t);
          }}
        />
      </XStack>
      <XStack>
        <SizableText theme="alt2">{`date taken `}</SizableText>
        <SizableText>{date}</SizableText>
      </XStack>
      <H3 marginTop="$4">Actions</H3>
      <YStack gap={3}>
        <Button icon={StarFull} backgroundColor={"$blue5"}>
          Share to partner clinic
        </Button>
        <Button icon={Download} onPress={saveImage} flex={1}>
          Save Image
        </Button>
        <Button icon={XCircle} backgroundColor={"$red10"} marginVertical="$3">
          Delete
        </Button>
      </YStack>
      <ImgModalViewer
        isVisible={visible}
        handleVisible={handleVisible}
        images={images}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 15,
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: "white",
    borderWidth: 1,
  },
});
