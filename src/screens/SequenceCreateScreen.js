import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Typography } from "../styles";
import { db, formatSqlSeqCreate, formatSqlTaskDelete } from "../api/sqlite";
import { windowWidth } from "../styles/spacing";
import { createTasks } from "../api/dataFunctions";

const SequenceCreateScreen = ({ route, navigation }) => {
   const [seq, setSeq] = useState('');
   const [tasks, setTasks] = useState([]);
   const [toDelete, setToDelete] = useState([]);

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

   const createSequence = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqCreate(seq.toString()),
            [],
            function (tx, res) {
               console.log('SEQUENCE CREATED')
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
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

   const saveAllChanges = () => {
      createSequence(seq.toString());
      createTasks(seq, tasks);
   };

   return (
      <View style={styles.container}>
         <TextInput
            value={seq}
            placeholder={'Sequence Name'}
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
                           onPress={() => {
                              let mutatedTasks = tasks.slice();
                              setToDelete(prevState => [...prevState, item.TaskID]);
                              mutatedTasks.splice(index, 1);
                              setTasks(mutatedTasks);
                           }}
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
            <Button
               title="save changes"
               onPress={async () => {
                  await saveAllChanges();
                  navigation.navigate('Sequences');
               }}
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

export default SequenceCreateScreen;
