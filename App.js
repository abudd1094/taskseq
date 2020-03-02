import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from './src/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import TestScreen from './src/screens/TestScreen';

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
   $textColor: '#0275d8'
});

export default function App() {
   const Stack = createStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

const styles = EStyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
   },
   link: {
      ...Colors.blue
   }
});