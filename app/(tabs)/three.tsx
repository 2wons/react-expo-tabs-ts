import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
       <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
