import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../styles";
import { db, formatSqlTaskDelete } from "../api/sqlite";
import { windowWidth } from "../styles/spacing";
import { createTasks, deleteSequence, updateSequence, updateTask, updateTasks } from "../api/dataFunctions";
import { Context } from "../context/SequenceContext";

const SequenceEditScreen = ({ navigation }) => {
   const { state, setTimer, setCurrentSeq, loadCurrentTasks, setLoading } = useContext(Context);
   const {currentSeq} = state;
   const [seq, setSeq] = useState(currentSeq);
   const [tasks, setTasks] = useState(state.currentTasks);
   const [toDelete, setToDelete] = useState([]);

   useEffect(() => {
      setTimer(false);
      loadCurrentTasks(state.currentSeq);
   }, []);

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

   const deleteTask = async (seq, id) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskDelete(seq, id),
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

   const deleteTasks = () => {
      toDelete.map(id => deleteTask(seq, id));
   };

   const updateIndexes = () => {
      let mutatedTasks = tasks.slice();
      for (let i = 0; i < tasks.length; i++) {
         mutatedTasks[i].TaskIndex = i + 1;
         updateTask(currentSeq, tasks[i].TaskID.toString(), 'TaskIndex', i + 1 )
      }
      setTasks(mutatedTasks);
   };

   const saveAllChanges = () => {
      setLoading(true);
      updateIndexes();
      updateTasks(currentSeq, tasks);
      updateSequence(currentSeq, seq);
      setCurrentSeq(seq);
      deleteTasks();
      createTasks(seq, tasks);
   };

   return (
     <View style={styles.container}>
         <TextInput
            value={seq}
            style={styles.title}
            onChangeText={input => setSeq(input)}
         />
         <View>
            <View style={styles.labelRow}>
               <Text style={styles.label}>Index</Text>
               <Text style={styles.label}>Name</Text>
               <Text style={styles.label}>Duration</Text>
            </View>
            <FlatList
               data={tasks}
               keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
               renderItem={({item, index}) => {
                  return(
                     <View style={styles.listRow}>
                        <Text style={[styles.listIndex, styles.listText]}>{index + 1}</Text>
                        <View style={styles.incrementer}>
                           {index > 0 &&
                              <Text style={styles.incrementerText} onPress={() => {
                                 let mutatedTasks = tasks.slice();
                                 let tasksToUpdate = mutatedTasks.splice(index - 1, 2);

                                 mutatedTasks.splice(index - 1, 0, tasksToUpdate[1], tasksToUpdate[0]);
                                 setTasks(mutatedTasks);
                              }}>▲</Text>
                           }
                           {index < tasks.length - 1 &&
                              <Text style={styles.incrementerText} onPress={() => {
                                 let mutatedTasks = tasks.slice();
                                 let tasksToUpdate = mutatedTasks.splice(index, 2);

                                 mutatedTasks.splice(index, 0, tasksToUpdate[1], tasksToUpdate[0]);
                                 setTasks(mutatedTasks);
                              }}>▼</Text>
                           }
                        </View>
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
                           style={[styles.listDuration, styles.listText]}
                           value={tasks[index].TaskDuration.toString()}
                           onChangeText={(input) => {
                              let mutatedTasks = tasks.slice();
                              mutatedTasks[index].TaskDuration = input.toString();
                              setTasks(mutatedTasks)
                           }}
                        />
                        <TouchableOpacity
                           style={styles.listRowButton}
                           onPress={() => {
                              let mutatedTasks = tasks.slice();
                              setToDelete(prevState => [...prevState, item.TaskID]);
                              mutatedTasks.splice(index, 1);
                              setTasks(mutatedTasks);
                           }}
                        >
                           <Image style={styles.delete} source={require('../../assets/icons/delete.png')}/>
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
              <Text style={styles.deleteSeq}>DELETE SEQUENCE</Text>
           </TouchableOpacity>
           <TouchableOpacity
              onPress={async () => {
                 await saveAllChanges();
                 setTimeout(() => navigation.navigate('ViewSequence'), 0)
              }}
              style={styles.buttonBottom}
           >
              <Text style={styles.saveSeq}>SAVE CHANGES</Text>
           </TouchableOpacity>
        </View>
     </View>
   );
};

const styles = EStyleSheet.create({
   bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      width: windowWidth,
   },
   buttonAdd: {
      alignSelf: 'center',
      position: 'absolute',
      bottom: -50,
   },
   buttonBottom: {
      flex: 1,
   },
   container: {
     flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '100%',
      padding: 20,
   },
   delete: {
     height: 18,
      width: 18
   },
   deleteSeq: {
      backgroundColor: 'red',
      paddingVertical: 12,
      textAlign: 'center'
   },
   saveSeq: {
      backgroundColor: 'green',
      color: 'white',
      paddingVertical: 12,
      textAlign: 'center',
      width: '100%'
   },
   incrementer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 50,
      width: 40,
   },
   incrementerText: {
      color: 'grey',
      fontSize: 20,
   },
   label: {
     flex: 1,
   },
   labelRow: {
      alignItems: 'center',
      borderColor: 'grey',
      borderBottomWidth: 2,
      flexDirection: 'row',
      marginTop: 10,
   },
   listRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
   },
   listText: {
      fontSize: 15,
   },
   listName: {
      flex: 3,
   },
   listDuration: {
      flex: 2,
   },
   listIndex: {
      flex: 0.5,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      textAlign: 'center'
   }
});

export default SequenceEditScreen;
