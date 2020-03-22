import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const Link = (text, name) => {
   return (
      <TouchableOpacity onPress={() => navigation.navigate('ViewSequence', {name})}>
         <Text>{text}</Text>
      </TouchableOpacity>
   )
};

const styles = EStyleSheet.create({
   container: {
   flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid black'
   }
});

export default Link;
