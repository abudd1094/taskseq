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

const styles = EStyleSheet.create({#

});

export default Link;
