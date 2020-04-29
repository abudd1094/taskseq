import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Input from "../atoms/Input";
import { Context } from "../../api/dataFunctions";
import { Colors } from "../../styles";

const TaskCreateInput = ({seqName}) => {
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState("");
   const [taskIndex, setTaskIndex] = useState("");
   const { state, createTask } = useContext(Context);

   function handleUpdate(item, field, input) {
      switch(field) {
         case 'name':
            updateTask(currentSeq, item.item.TaskName, 'TaskName', input);
            break;
         case 'duration':
            updateTask(currentSeq, item.item.TaskName, 'TaskDuration', input);
            break;
         default:
            break;
      }
   };

   return (
      <View style={styles.listRow}>
         <Text style={[styles.listIndex, styles.listText]}>{item.item.TaskIndex}</Text>
         <TextInput
            style={[styles.listName, styles.listText]}
            placeholder={item.item.TaskName}
            onChangeText={input => setLocalState(input)}
            onEndEditing={() => handleUpdate(item, 'name', localState)}
         />
         <TextInput
            style={[styles.listDuration, styles.listText]}
            placeholder={item.item.TaskDuration.toString()}
            onChangeText={input => handleUpdate(item, 'duration', input)}
         />
         <TouchableOpacity
            style={styles.listRowButton}
            onPress={() => deleteTask(currentSeq, item.item.TaskName)}
         >
            <Text style={styles.delete}>DELETE</Text>
         </TouchableOpacity>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      borderColor: 'grey',
      borderWidth: 1
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
});

export default TaskCreateInput;
