import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from '../components/atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";


const SequenceScreen = () => {
   useEffect(() => {
      console.log("seq screen loaded")

   }, []);

   const loadData = async () => {
   };

   return (
      <View style={styles.container}>
         <Text>Sequence Screen</Text>
         <Timer duration="60" />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      ...Spacing.container,
      justifyContent: 'space-around',
      height: '50%'
   }
});

export default SequenceScreen;
