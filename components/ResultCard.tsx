import type { CardProps } from "tamagui";
import { StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";
import { Button, Card, H2, Image, Paragraph, XStack, YStack } from "tamagui";

const width = Dimensions.get("window").width;

interface MyCardProps extends CardProps {
  title?: string | number;
  subtitle?: string;
  id: string;
  image?: string;
}

export default function ResultCard(props: MyCardProps) {
  var { title, subtitle, id, image, ...other } = props;

  return (
    <Card
      size={"$4"}
      animation="bouncy"
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      maxHeight={"$15"}
      bordered
      {...other}
    >
      <Card.Header padded>
        <XStack justifyContent="space-between">
          <YStack>
            <H2>{title ?? "None"}</H2>
            <Paragraph theme="alt2">{subtitle ?? "None"}</Paragraph>
          </YStack>
          <Image
            source={{
              uri: image,
              width: 50,
              height: 50,
            }}
            borderRadius={5}
          />
        </XStack>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Link href={{ pathname: "/result", params: { id: id } }} asChild>
          <Button borderRadius="$10">View</Button>
        </Link>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
          }}
        />
      </Card.Background>
    </Card>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
});
