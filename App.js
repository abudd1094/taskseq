import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from './src/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import HomeScreen from './src/screens/HomeScreen';
import SequenceListScreen from './src/screens/SequenceListScreen';

export default function App(props) {
   const Stack = createStackNavigator();
   const [ isLoadingComplete, setLoadingComplete ] = useState(false);

   // Load any resources or data that we need prior to rendering the app
   useEffect(() => {
      async function loadResourcesAndDataAsync() {
         try {
            // Load fonts
            await Font.loadAsync({
               'chicago': require('./assets/fonts/Chicago.ttf'),
            });
         } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
         } finally {
            setLoadingComplete(true);
         }
      }

      loadResourcesAndDataAsync();
   }, []);

   // Build global stylesheet variables and stylesheets
   EStyleSheet.build({
      $textColor: '#0275d8'
   });

   if (!isLoadingComplete && !props.skipLoadingScreen) {
      return null;
   } else {
      return (
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                     title: 'My home',
                     headerShown: false
                  }}
               />
               <Stack.Screen name="Sequences" component={SequenceListScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
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