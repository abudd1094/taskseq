import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Typography } from "../styles";
import {
   db,
   formatSqlAllSeqSelect,
   formatSqlAllTaskSelect,
   formatSqlSeqUpdate,
   formatSqlTaskUpdate
} from "../api/sqlite";

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
               setTasks(res.rows._array);
               setLoading(false);
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   const updateTask = async (taskName, columnToChange, newValue) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskUpdate(currentSeq, taskName, columnToChange, newValue),
            [],
            function (tx, res) {
               dispatch({ type: 'update_task', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };

   const updateSequence = async (newSeqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqUpdate(currentSeq, newSeqName),
            [],
            function (tx, res) {
               dispatch({ type: 'update_seq', payload: res });
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
        <FlatList
           data={tasks}
           style={styles.list}
           renderItem={({item, index}) => {
              return(
                 <View style={styles.listRow}>
                    <Text style={[styles.listIndex, styles.listText]}>{item.TaskIndex}</Text>
                    <TextInput
                       style={[styles.listName, styles.listText]}
                       placeholder={item.TaskName}
                       onChangeText={(input) => {
                          tasks.splice(index, 1, input);
                          setTasks([...tasks]);
                       }}
                    />
                    <TouchableOpacity
                       style={styles.listRowButton}
                       onPress={() => deleteTask(currentSeq, item.TaskName)}
                    >
                       <Text style={styles.delete}>DELETE</Text>
                    </TouchableOpacity>
                 </View>
              )
           }}
        />
        <TouchableOpacity
           onPress={() => {
              deleteSeq(currentSeq);
              navigation.navigate('Sequences');
           }}
           style={styles.buttonBottom}
        >
           <Text style={styles.delete}>DELETE SEQUENCE</Text>
        </TouchableOpacity>
        <Button
           title="log state"
           onPress={() => console.log(tasks)}
        />
     </View>
   );
};

const styles = EStyleSheet.create({
   buttonBottom: {
      alignSelf: 'center',
   },
   container: {
     flexDirection: 'column',
      height: '100%',
      padding: 20,
   },
   delete: {
     color: 'red',
   },
   list: {
   },
   listRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
