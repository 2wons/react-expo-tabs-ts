import { PointOfInterest } from "@/constants/Markers";

import { SizableText, Paragraph } from "tamagui";
import { XStack, YStack, Button } from "tamagui";
import { useTheme } from "tamagui";
import { MapPin } from "@tamagui/lucide-icons";

const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

type PlaceCardProps = {
  place: PointOfInterest;
};

export default function PlaceCard({ place }: PlaceCardProps) {  
  const theme = useTheme()

  return (
    <YStack flex={1} padding={15} borderRadius={10} backgroundColor={"$background"} elevation={"$0.5"}>
      <XStack>
        <MapPin size={24}/>
        <YStack flex={1} flexShrink={1}>
          <SizableText size='$4' fontWeight='800' numberOfLines={2}>{place.title}</SizableText>
          <SizableText size='$3' theme='alt1' numberOfLines={1}>{place.description}</SizableText>
        </YStack>
      </XStack>
      <SizableText size='$4' fontWeight='800'>Place Information</SizableText>
      <Paragraph>{LIPSUM}</Paragraph>
      <XStack gap="$2" paddingTop='$4' flex={1} alignItems="flex-end">
        <Button flex={1} flexGrow={1} themeInverse>See Info</Button>
      </XStack>
    </YStack>
  );
}
