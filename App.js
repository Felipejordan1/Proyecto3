import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {auth} from './src/firebase/config';
import Register from './src/screens/Register/Register';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Texto default a la espera</Text>
      <Register/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
