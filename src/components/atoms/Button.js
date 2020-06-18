import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { pastelGreen } from "../../styles/colors";
import { Context } from "../../context/SequenceContext";

const Button = ({onPress, title, color}) => {
   const { state } = useContext(Context);

   return (
      <TouchableOpacity style={[styles.container, {backgroundColor: color}]} activeOpacity={0.5} onPress={onPress}>
         <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
   )
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      borderRadius: 10,
      justifyContent: 'center',
      marginVertical: 3,
      minWidth: 80,
      paddingHorizontal: 16,
      paddingVertical: 8,
   },
   title: {
      color: 'white',
   }
});

export default Button;
