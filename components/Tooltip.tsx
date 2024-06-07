import { HelpCircle, XCircle } from "@tamagui/lucide-icons"
import { useState } from "react";
import { Modal } from "react-native";
import { View, SizableText, XStack, Paragraph } from "tamagui"
import { SafeAreaView } from "./Themed";

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
                <SafeAreaView style={{ flex: 1, backgroundColor: "black", opacity: 0.90, padding: 40 }}>
                    <XCircle size="$1" onPress={() => setVisible(false)} />
                    <Paragraph padding="$2">
                        {`Healthy (ICDAS Code 0)
No signs of decay. The tooth looks normal. It’s clean, smooth, and white without any spots or discoloration. 

Initial Caries  (ICDAS Code 1-2)
These are early signs of tooth decay. You might see some white spots on the tooth if you dry it first. These spots show the very early stage of decay just starting on the surface. You can also see white or light brown spots on the tooth even without drying it. These spots are signs of early decay, but the tooth surface is still mostly intact.

Moderate Caries  (ICDAS Code 3-4)
The tooth has small holes or rough spots where the enamel (the hard outer layer) has started to break down, but you can't see the deeper layer (dentin) yet. You might see a dark shadow under the enamel, indicating the decay is deeper and has reached the dentin (the layer under the enamel). The surface might still look mostly okay or have small breaks.

Extensive Caries  (ICDAS Code 5-6)
There’s a clear hole or cavity in the tooth, and you can see the dentin. The decay has gone through the enamel and reached the deeper layers. For an even more severe case, the tooth has a big, obvious cavity that might be close to or exposing the tooth's inner pulp (the soft part with nerves). There’s significant damage, with a lot of enamel and dentin lost.`}
                    </Paragraph>
                </SafeAreaView>
            </Modal>
        </View>
    )
}