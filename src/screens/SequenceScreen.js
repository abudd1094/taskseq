import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db, formatSqlAllTaskSelect } from "../api/sqlite";
import Timer from "../components/atoms/Timer";

const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = useState(0);
   const [ state, setState ] = useState();
   const [ loading, setLoading ] = useState(true);
   const [ currentTask, setCurrentTask ] = useState(0);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(currentSeq),
            [],
            function (tx, res) {
               setState(res.rows._array.sort((a, b) => a.TaskIndex - b.TaskIndex))
               setLoading(false);
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   const nextTask = () => {
      setCurrentTask(currentTask + 1)
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
               <Text style={[styles.defaultMarginTop]}>{state.length} tasks</Text>
            </View>

            <View>
               <Text style={styles.label}>Current:</Text>
               <Text>{state[currentTask].TaskName}</Text>
               <Timer
                  callback={nextTask}
                  duration={state[currentTask].TaskDuration}
               />
            </View>

            <FlatList
               data={state.filter(task => task.TaskIndex !== currentTask + 1)}
               keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
               style={[styles.defaultMarginTop, styles.list]}
               renderItem={item => <Text>{item.item.TaskName}</Text>}
            />
            <Button
               title={'log state'}
               onPress={() => {
                  console.log(state)
                  console.log('CURRENT')
                  console.log(currentTask)
               }}
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
      flex: 0.25,
   }
});

export default SequenceScreen;
