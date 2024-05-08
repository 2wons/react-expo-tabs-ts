import { StyleSheet} from "react-native";
import { Text } from "./Themed";
import { YStack, Button } from "tamagui";

type EmojiButtonProps = {
  emoji: string,
  label: string
  onPress: () => void
}

export const EmojiButton = ({emoji, label, onPress}: EmojiButtonProps) => {
    return (
      <YStack flex={1} gap="$5" borderWidth={0} padding={1} borderColor={'$background025'}>
        <Button alignSelf='stretch' size="$6" variant='outlined' borderWidth={1} height={80} onPress={onPress}>
          <Text style={styles.textEmoji}> { emoji }</Text>
          <Text>{ label }</Text>
        </Button>
      </YStack>
    )
}

const styles = StyleSheet.create({
    textEmoji: {
      fontSize: 20,
    },
  });