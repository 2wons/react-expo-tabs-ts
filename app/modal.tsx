import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import PlaceCard from '@/components/PlaceCard';
import { place } from '@/constants/Markers';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <PlaceCard place={place}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
