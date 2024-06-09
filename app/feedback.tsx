
import { ExternalLink } from "@/components/ExternalLink";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "tamagui";
import { MessageSquareShare } from "@tamagui/lucide-icons";
import { Image } from "react-native";

export default function FeedbackScreen() {
    const FEEDBACK_LINK = "https://survey.carident.live/"
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/surveyQR.png')} style={styles.qr} />
            <ExternalLink href={FEEDBACK_LINK} asChild>
                <Button icon={MessageSquareShare}>https://survey.carident.live/</Button>
            </ExternalLink>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    qr: {
        width: 300,
        height: 300,
        margin: 20
    }
});