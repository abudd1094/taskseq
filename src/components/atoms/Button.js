import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, title, color, style}) => {
   return (
      <TouchableOpacity style={[styles.container, {backgroundColor: color}, style && style]} activeOpacity={0.5} onPress={onPress}>
         <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
   )
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      borderRadius: 0,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
   },
   title: {
      color: 'white',
   }
});

export default Button;
