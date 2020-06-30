import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing, Typography } from "../styles";

const HomeScreen = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Task Sequencer 1.0.0</Text>
         <View style={styles.subcontainer}>
            <Text
               style={[ styles.link ]}
               onPress={() => navigation.navigate('Sequences')}
            >
               SEQUENCES
            </Text>
            <Text
               style={[ styles.link ]}
               onPress={() => navigation.navigate('Settings')}
            >
               SETTINGS
            </Text>
         </View>
      </View>
   )
};

HomeScreen.navigationOptions = () => {
   return {
      headerShown: false
   }
};

const styles = EStyleSheet.create({
   container: {
      alignItems: 'center',
      marginTop: '50%',
   },
   link: {
      fontSize: 20,
      marginBottom: '5%',
      textAlign: 'center'
   },
   subcontainer: {
      marginTop: '33%',
   },
   title: {
      ...Typography.primaryFont,
      ...Typography.h1
   }
});

export default HomeScreen;
