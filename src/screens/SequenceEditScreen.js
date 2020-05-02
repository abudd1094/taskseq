import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Typography } from "../styles";
import {
   db,
   formatSqlAllSeqSelect,
   formatSqlAllTaskSelect, formatSqlSeqDelete,
   formatSqlSeqUpdate, formatSqlTaskInsert,
   formatSqlTaskUpdate
} from "../api/sqlite";
import { windowWidth } from "../styles/spacing";

const SequenceEditScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;
   const [seq, setSeq] = useState(currentSeq);
   const [tasks, setTasks] = useState([]);
   const [ loading, setLoading ] = useState(true);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(currentSeq),
            [],
            function (tx, res) {
               console.log('SEQ EDIT RES')
               console.log(res.rows._array);
               setTasks(res.rows._array);
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });

      setLoading(false);
   };

   const addRow = () => {
      const newTask = {
        "TaskDuration": 10,
         "TaskIndex": tasks.length + 1,
         "TaskName": "New Task",
         "TaskID": tasks[tasks.length - 1] ? tasks[tasks.length - 1].TaskID + 1 : 1,
         new: true
      };

     setTasks(prevState => [...prevState, newTask])
   };

   const updateSequence = async (newSeqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqUpdate(currentSeq, newSeqName),
            [],
            function (tx, res) {
               console.log('Seq Name Updated')
            },
            (tx, err) => {

               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   const updateTask = async (taskID, columnToChange, newValue) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskUpdate(currentSeq, taskID, columnToChange, newValue),
            [],
            function (tx, res) {
               console.log('TASK UPDATED')
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   const updateTasks = () => {
      tasks.filter(task => !task.new).map(task => {
         updateTask(task.TaskID.toString(), 'TaskName', task.TaskName )
         updateTask(task.TaskID.toString(), 'TaskDuration', task.TaskDuration )
      })
   };

   const deleteTask = async (seq, id) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskDelete(seqName, taskID),
            [],
            function (tx, res) {
               console.log('TASK DELETED')
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   const createTask = async (taskName, taskDuration, taskIndex) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskInsert(seq, taskName, taskDuration, taskIndex),
            [],
            function (tx, res) {
               console.log('SUCCESSFULLY CREATED')
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   const createTasks = () => {
      tasks.filter(task => task.new).map(task => createTask(task.TaskName, task.TaskDuration.toString(), task.TaskIndex.toString()));
   };

   const saveAllChanges = () => {
      updateTasks();
      updateSequence(seq);
      createTasks();
   };

   const deleteSequence = async (seqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqDelete(seqName),
            [],
            function (tx, res) {
               console.log('SUCCESSFULLY DELETED')
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   useEffect( () => {
      loadData();

      const unsubscribe = navigation.addListener('focus', () => {
         loadData();
      });

      return unsubscribe;
   }, [navigation]);

   return (
     <View style={styles.container}>
         <TextInput
            value={seq}
            style={styles.title}
            onChangeText={input => setSeq(input)}
         />
         <View>
            <FlatList
               data={tasks}
               keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
               style={styles.list}
               renderItem={({item, index}) => {
                  return(
                     <View style={styles.listRow}>
                        <Text style={[styles.listIndex, styles.listText]}>{item.TaskIndex}</Text>
                        <TextInput
                           style={[styles.listName, styles.listText]}
                           value={tasks[index].TaskName}
                           onChangeText={(input) => {
                              let mutatedTasks = tasks.slice();
                              mutatedTasks[index].TaskName = input;
                              setTasks(mutatedTasks);
                           }}
                        />
                        <TextInput
                           style={[styles.listName, styles.listText]}
                           value={tasks[index].TaskDuration.toString()}
                           onChangeText={(input) => {
                              let mutatedTasks = tasks.slice();
                              mutatedTasks[index].TaskDuration = input.toString();
                              setTasks(mutatedTasks)
                           }}
                        />
                        <TouchableOpacity
                           style={styles.listRowButton}
                           onPress={() => deleteTask(currentSeq, item.TaskID)}
                        >
                           <Text style={styles.delete}>DELETE</Text>
                        </TouchableOpacity>
                     </View>
                  )
               }}
            />
            <TouchableOpacity
               style={styles.buttonAdd}
               onPress={addRow}
            >
               <Text>ADD TASK</Text>
            </TouchableOpacity>
         </View>

        <View style={styles.bottom}>
           <TouchableOpacity
              onPress={() => {
                 deleteSequence(currentSeq);
                 navigation.navigate('Sequences');
              }}
              style={styles.buttonBottom}
           >
              <Text style={styles.delete}>DELETE SEQUENCE</Text>
           </TouchableOpacity>
           <Button
              title="save changes"
              onPress={async () => {
                 await saveAllChanges();
                 navigation.navigate('ViewSequence', {currentSeq: seq});
              }}
           />
           <Button
              title="log state"
              onPress={() => console.log(tasks)}
           />
        </View>

     </View>
   );
};

const styles = EStyleSheet.create({
   bottom: {
      position: 'absolute',
      bottom: 10,
      width: windowWidth,
   },
   buttonAdd: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: -30,
   },
   buttonBottom: {
      alignSelf: 'center',
   },
   container: {
     flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '100%',
      padding: 20,
   },
   delete: {
     color: 'red',
   },
   list: {
      backgroundColor: 'lime'
   },
   listRow: {
      flexDirection: 'row',
      marginTop: 10,
   },
   listRowButton: {
      flex: 1,
   },
   listText: {
      fontSize: 15,
      ...Colors.blue,
   },
   listName: {
      flex: 2,
   },
   listDuration: {
      flex: 1,
   },
   listIndex: {
      flex: 1,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      textAlign: 'center'
   }
});

export default SequenceEditScreen;
