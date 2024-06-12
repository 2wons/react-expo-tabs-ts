import { ScrollView, View } from "@/components/Themed";
import { XStack, H1, YStack } from "tamagui";
import { Archive } from "@tamagui/lucide-icons";
import { Alert } from "react-native";
import { useData, Report } from "@/contexts/DataContext";
import { Button } from "@/components/Button";

export default function ArchiveScreen() {
	const { history, edit, remove } = useData();

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

	const reports = Object.keys(history!).reverse().map((id) => {
    const i = history![id];
    const dateTaken = new Date(i.timestamp)
    if (!i.archived) return null;
    return ( 
			<YStack key={id} gap="$1" marginVertical="$3" padding="$3" borderStyle="dashed" borderColor="$gray3" borderWidth="$1">
				<Archive size={24} />
				<H1>{i.title}</H1>
				<XStack gap="$2">
					<Button flex={1} onPress={() => restore(i.id.toString())}>Restore</Button>
					<Button flex={1} onPress={() => removeMe(i.id.toString())}>Delete</Button>
				</XStack>
			</YStack>
    )
  });

	return (
		<>
		<View style={{ flex: 1, padding: 16 }}>
			<H1>Archived Reports</H1>
			<ScrollView>
				{reports}
			</ScrollView>
		</View>
		</>
	)
}