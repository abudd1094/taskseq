import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MenuButton = ({text, onPress, bgColor, textColor}) => {
   return (
      <TouchableOpacity activeOpacity={0.5} style={[styles.container, {backgroundColor: bgColor}]} onPress={() => onPress()}>
         <Text style={[styles.text, {textAlign: 'center', color: textColor}]}>{text.toString()}</Text>
      </TouchableOpacity>
   )
};

const styles = StyleSheet.create({
   container: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: '100%',
   },
   text: {
      fontSize: 20,
   }
});

export default MenuButton;
