import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Navigation from './config/Navigation'
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>hello world</Text> */}
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

