import { Image, StyleSheet, Alert, TouchableOpacity, useColorScheme } from "react-native";
import { ScrollView } from "@/components/Themed";
import { XStack, YStack, SizableText, H1, H3, Paragraph, View } from "tamagui";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ImgModalViewer } from "@/components/ImgModalViewer";

import { Summary } from "@/components/Summary";
import { Input } from "tamagui";
import { StarFull, XCircle, Download, Lock } from "@tamagui/lucide-icons";
import { useData } from "@/contexts/DataContext";
import { AlertButton } from "@/components/Alert";
import { ClassCounts } from "@/components/ResultView";

import * as MediaLibrary from "expo-media-library";
import { getRecommendation } from "@/constants/Common";
import { Tooltip } from "@/components/Tooltip";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

export default function ResultScreen() {
  const [visible, setVisible] = useState(false);
  const params = useLocalSearchParams();
  const { history, remove } = useData()
  const { id } = params;

  const [prevtitle, setPrevtitle] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();
  const [date, setDate] = useState<string>();
  const [extreme, setExtreme] = useState<string>();
  const [summary, setSummary] = useState<ClassCounts>({});
  const [isShared, setIsShared] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const getResult = async () => {
    const { img, timestamp, title, summary, extreme, shared } = history![id!.toString()];
    const parseDate = new Date(timestamp);
    setImage(img);
    setTitle(title);
    setPrevtitle(title);
    setSummary(summary);
    setExtreme(extreme);
    setIsShared(shared!);
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

  const removeMe = async () => {
    await remove!(id!.toString())
      .then()
      .catch(error => {
        Alert.alert("Something went wrong")
      })
      router.back()
  };

  const shareReport = async () => {
    const { serverId } = history![id!.toString()];
    router.push({
      pathname: "/partner/share",
      params: { serverId: serverId, localId: id!.toString() }
    })
  }

  useEffect(() => {
    getResult();
  }, [history]);

  const images = [{ url: image! }];
  const theme = useColorScheme() ?? 'light';

  const defaultImage = "https://i.postimg.cc/FFcjKg98/placeholder.png";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Badge 
        icon={<Lock size="$1" color="$yellow9" />}
        variant="default" 
        paddingHorizontal="$5"
        borderRadius="$6" 
        justifyContent="center"
        alignItems="center"
        label={isShared 
          ? "This shared report is end-to-end encrypted to a shared clinic."
          : "This report is only saved on your device."}
        onPress={() => {console.log(isShared)}}
      />
      <View paddingVertical="$2">
        <SizableText size="$3" theme="alt1">
          Viewing
        </SizableText>
        <H1>{title}</H1>
      </View>
      <YStack
        backgroundColor={"$background025"}
        justifyContent="center"
        alignItems="center"
        paddingBottom="$3"
      >
        <TouchableOpacity onPress={handleVisible}>
          <Image
            source={{ uri: image ? image : defaultImage }}
            style={{...styles.image, borderColor: theme === 'dark' ? 'white' : 'black'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </YStack>
      <XStack alignItems="center" paddingVertical="$1" gap="$2">
        <H3>Summary</H3>
        <Tooltip text="what's this" />
      </XStack>
      <Summary counts={summary} />
      <View paddingVertical="$2">
        <SizableText marginVertical="$2" marginBottom="$1.5">Insights & Recommendations</SizableText>
        <YStack padding="$3" backgroundColor="$gray1" borderRadius={10}>
          <Paragraph>{extreme ? getRecommendation(summary, extreme) : 'Recommendations not available'}</Paragraph>
        </YStack>
      </View>
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
          disabled
        />
      </XStack>
      <XStack>
        <SizableText theme="alt2">{`date taken `}</SizableText>
        <SizableText>{date}</SizableText>
      </XStack>
      <H3 marginTop="$4">Actions</H3>
      <YStack gap={3}>
        <Button icon={StarFull} variant="primary" onPress={shareReport}>
          Share to partner clinic
        </Button>
        <Button icon={Download} onPress={saveImage} flex={1}>
          Save Image
        </Button>
        <AlertButton
          label="Delete"
          title="Delete Report"
          message="Are you sure you want to delete this report?"
          icon={XCircle}
          onConfirm={removeMe}
          backgroundColor="$red10"
          marginTop={10}
          color="$white1"
          danger
          cancellable
        />
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
    paddingHorizontal: 25,
    paddingVertical: 10,
    paddingBottom: 20
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
