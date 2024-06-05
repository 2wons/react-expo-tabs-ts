import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { YStack, Input, Avatar, H1, Text, Circle } from "tamagui";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthyContext";
import { Pencil } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadAvatar, editSelf } from "@/services/authService";
import { Alert } from "react-native";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";

export default function EditProfileSreen() {
  const { user, onRefresh: refresh } = useAuth();

  const [loading, setLoading] = useState(false);
  const [avi, setAvi] = useState<string | null>("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [canSave, setCanSave] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const selectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setAvi(result.assets[0].uri);
      setCanSave(true);
      setAvatarChanged(true);
    }
    
  };

  const updateAvatar = async () => {
    await uploadAvatar(avi!)
      .then(() => {})
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
      });
  };

  const updateName = async () => {
    await editSelf(name)
      .then()
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
      });
  };

  const saveChanges = async () => {
    setLoading(true);
    let updated = false;
    if (avatarChanged) {
      await updateAvatar();
      setAvatarChanged(false);
      updated = true;
    }
    if (name !== user?.name) {
      await updateName();
      updated = true;
    }
    if (updated) {
      Alert.alert("Profile updated");
      await refresh!();
      console.log(user?.avatar);
    }
    console.log(updated);
    setCanSave(false);
    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Profile",
      headerBackTitleVisible: false,
    });
    setAvi(user?.avatar!);
    setName(user?.name!);
  }, [user]);

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$5">
      <Circle
        size={"$15"}
        borderWidth="$2"
        borderStyle="dashed"
        borderColor="$color12"
      >
        <Avatar circular size="$13">
          <Avatar.Image
            source={avi ? { uri: avi } : require("@/assets/images/avatardefault.png")}
            accessibilityLabel="Cam"
            defaultSource={require("@/assets/images/avatardefault.png")}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Circle
          onPress={selectAvatar}
          size="$5"
          backgroundColor="$color3"
          position="absolute"
          top={0}
          right={0}
        >
          <Pencil size="$2" />
        </Circle>
      </Circle>
      <Input
        value={name}
        placeholder="Name"
        onChangeText={(t) => {
          setName(t);
          if (t !== user?.name) {
            setCanSave(true);
          } else {
            setCanSave(false);
          }
        }}
      />
      <Button onPress={saveChanges} disableed={!canSave} disabled={!canSave}>
        Save Changes
      </Button>
      {loading && <Loader message="Saving Changes" />}
    </YStack>
  );
}
