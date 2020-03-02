import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from "../styles";

const TestScreen = () => {
   return (
      <View style={styles.container}>
         <Text style={styles.link}>Test Screen</Text>
      </View>
   )
};

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

export default TestScreen;