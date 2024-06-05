import { PointOfInterest } from "@/constants/Markers";

import { SizableText, Paragraph } from "tamagui";
import { XStack, YStack, Button } from "tamagui";
import { useTheme } from "tamagui";
import { MapPin, StarFull } from "@tamagui/lucide-icons";
import { Badge } from "./Badge";

type PlaceCardProps = {
  place: PointOfInterest;
  onPress?: () => void;
};

export default function PlaceCard({ place, onPress }: PlaceCardProps) {  
  const theme = useTheme()

  return (
    <YStack flex={1} padding={15} borderRadius={10} backgroundColor={"$gray1"} elevation={"$0.5"}>
      <XStack gap="$2" alignItems="flex-start">
        <MapPin size={24}/>
        <YStack flex={1} flexShrink={1}>
          <SizableText size='$4' fontWeight='800' numberOfLines={2}>{place.title}</SizableText>
          <SizableText size='$3' theme='alt1' numberOfLines={1}>{place.description}</SizableText>
        </YStack>
        {
          place.open_now
          ? <Badge label="Open Now" variant="success"/>
          : <Badge label="Closed Now" variant="danger"/>
        }
      </XStack>
      <SizableText size='$4' fontWeight='800' marginTop="$2">Place Information</SizableText>
      <Paragraph>Rating: <StarFull size="$1" /> {place.rating} {`(${place.reviews} reviews)`}</Paragraph>
      <XStack gap="$2" paddingTop='$4' flex={1} alignItems="flex-end">
        <Button onPress={onPress} flex={1} flexGrow={1} themeInverse>Navigate</Button>
      </XStack>
    </YStack>
  );
}
