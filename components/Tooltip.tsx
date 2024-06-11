import { HelpCircle, XCircle } from "@tamagui/lucide-icons"
import { useState } from "react";
import { Modal } from "react-native";
import { View, SizableText, XStack, Paragraph, H2, Text, H3, H4 } from "tamagui"
import { SafeAreaView } from "./Themed";
import { Badge } from "./Badge";
import { icdas } from "@/constants/Common";

export interface TooltipProps {
    text?: string;
}

export const Tooltip = (props: TooltipProps) => {
    const [visible, setVisible] = useState(false)
    return (
        <View alignItems="center" borderRadius="$10" borderColor="$gray7" borderWidth="$1" padding="$1.5">
            <XStack gap="$1" alignItems="center" onPress={() => setVisible(!visible)}>
                <HelpCircle size="$1" color="$gray7" />
                <SizableText paddingRight="$1" theme="alt2" size="$2">{props.text}</SizableText>
            </XStack>
            <Modal visible={visible} animationType="fade" transparent>
                <SafeAreaView style={{ flex: 1, backgroundColor: "black", opacity: 0.95 }}>
                    <View padding="$3" backgroundColor="$background" flex={1}>
                        <XCircle size="$2" onPress={() => setVisible(false)} alignSelf="flex-end" />

                        <SummaryHelp />
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export const SummaryHelp = () => {
    const [info, setInfo] = useState<{title: string, description: string}>(icdas.healthy)
    return (
        <>
        <H2>What's the Summary?</H2>
        <SizableText size="$1" theme="alt1">
        The summary shows the count of detected caries by type, helping you understand the health of your teeth using the ICDAS standard, a system that categorizes caries from healthy to severe.
        </SizableText>
        <XStack padding="$3" paddingBottom="$5" gap="$3">
            <Badge label="Healthy" variant="success" onPress={() => setInfo(icdas.healthy)} pressable />
            <Badge label="Iniital" variant="warning" onPress={() => setInfo(icdas.initial)} pressable/>
            <Badge label="Moderate" variant="alert" onPress={() => setInfo(icdas.moderate)} pressable/>
            <Badge label="Extensive" variant="danger" onPress={() => setInfo(icdas.extensive)} pressable/>
        </XStack>
        <View backgroundColor="$gray1" borderColor="$gray2" borderWidth="$1" opacity={1.0} padding="$4" borderRadius="$3">
            <H4 paddingBottom="$3">{info.title}</H4>
            <Paragraph>{info.description}</Paragraph>
        </View>
        </>
    )
}