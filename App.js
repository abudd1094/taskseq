import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing } from './src/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Provider } from './src/context/SequenceContext';

import HomeScreen from './src/screens/HomeScreen';
import SequenceListScreen from './src/screens/SequenceListScreen';
import SequenceCreateScreen from './src/screens/SequenceCreateScreen';
import SequenceEditScreen from './src/screens/SequenceEditScreen';
import SequenceScreen from './src/screens/SequenceScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CompletionLogScreen from './src/screens/CompletionLogScreen';
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
        <Provider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="CompletionLog" component={CompletionLogScreen} />
              <Stack.Screen name="Sequences" component={SequenceListScreen} />
              <Stack.Screen
                name="SequenceCreate"
                component={SequenceCreateScreen}
                options={{ title: "New Sequence" }}
              />
              <Stack.Screen
                name="SequenceEdit"
                component={SequenceEditScreen}
                options={{ title: "Edit Sequence" }}
              />
              <Stack.Screen
                name="ViewSequence"
                component={SequenceScreen}
                options={{ title: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
   }
}

const styles = EStyleSheet.create({
   container: {
      ...Spacing.container
   },
});
