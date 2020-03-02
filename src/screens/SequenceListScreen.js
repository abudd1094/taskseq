import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from "../styles";

const SequenceListScreen = () => {
   const [ state, useState ] = useState();

   return (
      <View style={styles.container}>
         <Text>Sequences</Text>
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

export default SequenceListScreen;