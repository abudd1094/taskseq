import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Task from '../components/molecules/Task';
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = React.useState(0);
   const [seq, setSeq] = useState('');
   const [tasks, setTasks] = useState([{taskName: 'initialTask'}]);

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
      }, (err) => console.log(err), () => console.log('new length ' + tasks.length));
   };

   return (
      <View style={styles.container}>
         <Text style={[styles.title, styles.defaultMarginTop]}>{seq}</Text>
         {tasks.length > 0 ?
            <Task style={styles.task} name={tasks[0].taskName} duration={tasks[0].taskDuration} />
            : null
         }
         <FlatList
            data={tasks}
            keyExtractor={(task) => task.taskName}
            style={{textAlign: 'center', marginTop: 20}}
            renderItem={(task) => <Text>{task.taskName}</Text>}
         />
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
