import { PointOfInterest } from "@/constants/Markers";

import { SizableText, Paragraph } from "tamagui";
import { XStack, YStack } from "tamagui";
import { useTheme } from "tamagui";
import { MapPin, StarFull } from "@tamagui/lucide-icons";
import { Badge } from "./Badge";
import { Link } from "expo-router";
import { Button } from "./Button";

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
        <Link href={{
          pathname: '/partner/book',
          params: {
            id: place.id?.toString(),
            clinicName: place.title,
            clinicAddress: place.description
          }
        }} 
        asChild
        >
        <Button variant="primary" themeInverse width="70%">Book Appointment</Button>
        </Link>
        <Button onPress={onPress} width="30%" themeInverse>Locate</Button>
      </XStack>
    </YStack>
  );
}
