import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db, formatSqlAllTaskSelect } from "../api/sqlite";
import Timer from "../components/atoms/Timer";
import Task from '../components/molecules/Task';
import { lightGrey } from "../styles/colors";
import { Context } from "../context/SequenceContext";

const SequenceScreen = ({ route, navigation }) => {
   const { state, loading, currentSeq, currentTask, currentTasks, setCurrentSeq, setCurrentTask, setCurrentTasks, setLoading } = useContext(Context);
   const [ count, setCount ] = useState(0);
   const [ tasks, setTasks ] = useState();
   const [ complete, setComplete ] = useState(false);
   const [ startTimer, setStartTimer ] = useState(false);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(currentSeq),
            [],
            function (tx, res) {
               setCurrentTasks(res.rows._array.sort((a, b) => a.TaskIndex - b.TaskIndex));
               setCurrentSeq(currentSeqParam);
               setLoading(false);
            },
            (tx, err) => {
               console.log('tasks error');
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

   const resetSeq = () => {
      setStartTimer(false);
      setComplete(false);
      setLoading(true);
      setCurrentTask(0);
      setTimeout(() => setLoading(false), 500)
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
               <Text style={{textAlign: 'center'}}>{tasks.length} Tasks</Text>
               <Timer
                  callback={() => {}}
                  color='black'
                  duration={currentTask < tasks.length ? tasks.map(task => task.TaskDuration).reduce((total, n) => total + n) : 0}
                  fontSize={60}
                  startTimer={startTimer}
               />
               <Button
                  title={startTimer ? 'STOP' : 'START'}
                  onPress={() => {
                     startTimer ? setStartTimer(false) : setStartTimer(true);
                  }}
                  style={styles.buttonDefault}
               />
            </View>
            <Task
               current
               name={tasks[currentTask].TaskName}
               callback={nextTask}
               duration={tasks[currentTask].TaskDuration}
               index={tasks[currentTask].TaskIndex}
               startTimer={startTimer}
            />
            <FlatList
               data={tasks.filter(task => task.TaskIndex > currentTask + 1).sort((a, b) => a.TaskIndex - b.TaskIndex)}
               keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
               style={[styles.list]}
               renderItem={item => <Task index={item.item.TaskIndex} name={item.item.TaskName} duration={item.item.TaskDuration}/>}
            />
            <Button
               title={'RESET'}
               onPress={() => resetSeq()}
               style={styles.buttonDefault}
            />
            <Button
               title={'LOG'}
               onPress={() => console.log(tasks)}
            />
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
   buttonDefault: {
      backgroundColor: 'red',
   },
   container: {
      alignItems: 'flex-start',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      height: '100%'
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   inactive: {
     color: lightGrey,
   },
   label: {
     color: 'red',
   },
   list: {
      flex: 3,
   },
   listText: {
      fontSize: 15,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
   },
   top: {
      alignSelf: 'center',
   }
});

export default SequenceScreen;
