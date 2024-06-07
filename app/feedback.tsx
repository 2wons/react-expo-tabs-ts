
import { ExternalLink } from "@/components/ExternalLink";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "tamagui";
import { MessageSquareShare } from "@tamagui/lucide-icons";
import { Image } from "react-native";

export default function FeedbackScreen() {
    const FEEDBACK_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSecwrS5SShcnZqSqctCGgJht_zu1IeZh_DNjyWa1WjeIGzLWA/viewform"
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/surveyQR.png')} style={styles.qr} />
            <ExternalLink href={FEEDBACK_LINK} asChild>
                <Button icon={MessageSquareShare}>Open Google Feedback Form</Button>
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