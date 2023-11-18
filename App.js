import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {auth} from './src/firebase/config.js';
import Menu from './src/components/menu.js';
import Registro from './src/screens/Registro/Registro.js';
import Loguearse from './src/screens/Loguearse/Loguearse.js';

export default function App() {
  const Stack= createNativeStackNavigator() ;
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Loguearse' component={Loguearse} options={{headerShown:false}}/>
      <Stack.Screen name='Registro' component={Registro} options={{headerShown:false}}/>
      <Stack.Screen name='Menu' component={Menu} options={{headerShown:false}}/>

        
      </Stack.Navigator>
    </NavigationContainer>
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
