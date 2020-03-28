import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Task from '../components/molecules/Task';
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = React.useState(0);
   const [seq, setSeq] = useState('');
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      loadSeqData();
   }, []);

   useEffect(() => {
      console.log('tasks log');
      console.log(tasks)
   }, [tasks]);

   const formatSqlSelect = (seq) => {
      return "SELECT * FROM TaskTable WHERE seq=" + "'" + seq.toString() + "'";
   };

   const loadSeqData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSelect(currentSeq),
            [],
            function (tx, res) {
               setSeq(currentSeq);

               for (let i = 0; i < res.rows.length; i++) {
                  console.log('in for loop');
                  console.log(res.rows.item(i));
                  console.log(!tasks.includes(res.rows.item(i)));
                  if (!tasks.includes(res.rows.item(i))) {
                     setTasks(prevState => [...prevState, res.rows.item(i)]);
                  }
               }
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      }, (err) => console.log(err), () => console.log('successful! woo!'));
   };

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateSequence')}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
         <Text style={[styles.title, styles.defaultMarginTop]}>{seq}</Text>
         <Task style={styles.task} name="testyTask" duration="55" />
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
