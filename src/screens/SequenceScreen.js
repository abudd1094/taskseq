import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Task from '../components/molecules/Task';
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";
import { Context } from "../context/SequenceContext";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = React.useState(0);
   const { state, getSeq } = useContext(Context);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit', {currentSeq: currentSeq})}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   useEffect(() => {
      getSeq(currentSeq);
      console.log('seq screen')
   }, []);

   return (
      <View style={styles.container}>
         <Text style={[styles.title, styles.defaultMarginTop]}>{currentSeq}</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   button: {
      ...Colors.blue,
      fontSize: 17,
      marginRight: '1rem'
   },
   container: {
      ...Spacing.container
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      flex: 1
   }
});

export default SequenceScreen;
