import { ScrollView, View } from "@/components/Themed";
import { XStack, H3, H2, YStack, Text, Image } from "tamagui";
import { Archive } from "@tamagui/lucide-icons";
import { Alert } from "react-native";
import { useData, Report } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function ArchiveScreen() {
	const { history, edit, remove } = useData();
	const navigation = useNavigation()

	const restore =  async (id: string) => {
	  const report = history![id.toString()];
      const newReport = { ...report, archived: false };
      await edit!(id!, newReport)
        .then()
        .catch(error => {
          Alert.alert("Something went wrong")
        })
      Alert.alert("Report Restored")
	}

	const removeMe = async (id: string) => {
		await remove!(id!)
			.then()
			.catch(error => {
				Alert.alert("Something went wrong")
			})
			Alert.alert("Report Deleted")
	}

	useEffect(() => {
		navigation.setOptions({
			title: 'Archives'
		})
	}, [])

	const reports = Object.keys(history!).reverse().map((id) => {
    const i = history![id];
    const dateTaken = new Date(i.timestamp)
    if (!i.archived) return null;
    return ( 
			<YStack key={id} gap="$1" marginVertical="$3" padding="$3" borderStyle="dashed" borderColor="$gray3" borderWidth="$1" borderRadius="$3">
				<XStack justifyContent="space-between" alignItems="center">
					<XStack gap="$2" alignItems="center">
						<Archive size={24} />
						<H3 numberOfLines={1}>{i.title}</H3>
					</XStack>
					<Image
						source={{
							uri: i.img,
							width: 30,
							height: 30,
						}}
						blurRadius={1.0}
						borderRadius={5}
					/>
				</XStack>
				<Text theme="alt2">{new Date(i.timestamp).toDateString()}</Text>
				<XStack gap="$2">
					<Button size="$3" flex={1} onPress={() => restore(i.id.toString())}>Restore</Button>
					<Button variant="destructive" size="$3" flex={1} onPress={() => removeMe(i.id.toString())}>Delete</Button>
				</XStack>
			</YStack>
    )
  });

	return (
		<>
		<View style={{ flex: 1, padding: 16 }}>
			<H2>Archived Reports</H2>
			<Text theme="alt2">A list of your archived reports</Text>
			<ScrollView>
				{reports}
			</ScrollView>
		</View>
		</>
	)
}