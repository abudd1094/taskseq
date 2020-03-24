import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
               console.log(res)

               for (let i = 0; i < res.rows.length; i++) {
                  console.log('for loop iteration ' + i)
                  console.log(res.rows.item(i))
                  setTasks([...tasks, {taskName: res.rows.item(i).taskName, taskDuration: res.rows.item(i).taskDuration}]);
               }

               console.log('post for loop state')
               console.log(tasks)
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
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
