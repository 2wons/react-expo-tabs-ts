import { HelpCircle } from "@tamagui/lucide-icons"
import { View, SizableText, XStack } from "tamagui"

export interface TooltipProps {
    text?: string;
}

export const Tooltip = (props: TooltipProps) => {
    return (
        <View alignItems="center" borderRadius="$10" borderColor="$gray7" borderWidth="$1" padding="$1.5">
            <XStack gap="$2">
                <HelpCircle size="$1" color="$gray7" />
                <SizableText theme="alt2" size="$2">{props.text}</SizableText>
            </XStack>
        </View>
    )
}