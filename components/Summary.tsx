import { SizableText, YStack, XStack, Circle } from "tamagui";
import { ClassCounts } from "./ResultView";

interface SummaryProps {
  counts: ClassCounts
}

export const Summary = ({ counts }: SummaryProps) => {
  return (
    <>
      <SizableText>Detected Caries</SizableText>
      <XStack 
        justifyContent="space-between" 
        alignItems="center" 
        backgroundColor={"$gray1"} 
        paddingVertical="$2" 
        paddingHorizontal="$3" 
        borderRadius={10}
        borderColor={'$gray3'}
        borderWidth={1}
      >
        <YStack gap={3}>
          <Circle backgroundColor={'$gray1'} size="$1.5"/>
          <Circle backgroundColor={'$yellow10'} size="$1.5"/>
          <Circle backgroundColor={'$orange10'} size="$1.5"/>
          <Circle backgroundColor={'$red10'} size="$1.5"/>
        </YStack>
        <YStack gap={3}>
          <SizableText theme="alt2">Caries Class</SizableText>
          <SizableText>Initial</SizableText>
          <SizableText>Moderate</SizableText>
          <SizableText>Extensive</SizableText>

        </YStack>
        <YStack gap={3}>
          <SizableText theme="alt2">Count</SizableText>
          <SizableText>{ counts.initial ?? "0" }</SizableText>
          <SizableText>{ counts.moderate ?? "0" }</SizableText>
          <SizableText>{ counts.extensive ?? "0" }</SizableText>
        </YStack>
      </XStack>
    </>
  )
};
