import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db, formatSqlAllTaskSelect } from "../api/sqlite";
import Timer from "../components/atoms/Timer";

const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = useState(0);
   const [ tasks, setTasks ] = useState();
   const [ complete, setComplete ] = useState(false);
   const [ startTimer, setStartTimer ] = useState(false);
   const [ loading, setLoading ] = useState(true);
   const [ currentTask, setCurrentTask ] = useState(0);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(currentSeq),
            [],
            function (tx, res) {
               setTasks(res.rows._array.sort((a, b) => a.TaskIndex - b.TaskIndex))
               setLoading(false);
            },
            (tx, err) => {
               console.log('tasksment error');
               console.log(err);
            }
         );
      })
   };

   const nextTask = () => {
      if (currentTask < tasks.length - 1) {
         setCurrentTask(currentTask + 1);
      } else {
         setComplete(true);
      }

   };

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit', {currentSeq: currentSeq})}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount, currentSeq ]);

   useEffect(() => {
      loadData();

      const unsubscribe = navigation.addListener('focus', () => {
         loadData();
      });

      return unsubscribe;
   }, [navigation, currentSeq]);

   if (loading) {
      return(
         <Text>Loading...</Text>
      )
   } else {
      return (
         <View style={styles.container}>
            <View style={styles.top}>
               <Text style={[styles.title, styles.defaultMarginTop]}>{currentSeq}</Text>
               <Text style={[styles.defaultMarginTop]}>{tasks.length} Tasks</Text>
            </View>
            <Timer
               callback={nextTask}
               duration={currentTask < tasks.length ? tasks[currentTask].TaskDuration : 0}
               startTimer={startTimer}
            />
            <View>
               <Button
                  title={startTimer ? 'STOP' : 'START'}
                  onPress={() => {
                     startTimer ? setStartTimer(false) : setStartTimer(true);
                  }}
               />
               <Text style={styles.label}>Current:</Text>
               <Text>{tasks[currentTask].TaskName}</Text>
               <Text>{complete ? 'Complete!' : 'In progress...'}</Text>
               <FlatList
                  data={tasks.filter(task => task.TaskIndex !== currentTask + 1).sort((a, b) => a.TaskIndex - b.TaskIndex)}
                  keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
                  style={[styles.defaultMarginTop, styles.list]}
                  renderItem={item => <Text>{item.item.TaskName}</Text>}
               />
            </View>
         </View>
      )
   }
};

const styles = EStyleSheet.create({
   bottom: {
      flex: 0.25,
   },
   button: {
      fontSize: 17,
      marginRight: 10,
   },
   container: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      height: '100%'
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   label: {
     color: 'red',
   },
   list: {
      flex: 3,
   },
   listText: {
      fontSize: 15,
      ...Colors.blue
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
   },
   top: {

   }
});

export default SequenceScreen;
