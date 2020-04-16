import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Input from "../atoms/Input";
import { Context } from "../../context/SequenceContext";

const TaskCreateInput = ({seqName}) => {
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState("");
   const [taskIndex, setTaskIndex] = useState("");
   const { state, createTask } = useContext(Context);


   return (
      <View style={styles.container}>
         <Input
            label="Task name:"
            value={taskName}
            onChangeText={string => setTaskName(string)}
            style={[styles.inputName, styles.defaultMarginBottom]}
         />
         <Input
            label="Task duration:"
            value={taskDuration}
            onChangeText={number => setTaskDuration(number)}
            style={[styles.inputDuration, styles.defaultMarginBottom]}
         />
         <Input
            label="Task index:"
            value={taskIndex}
            onChangeText={number => setTaskIndex(number)}
            style={[styles.inputDuration, styles.defaultMarginBottom]}
         />
         <Button
            title="Add Task"
            onPress={() => createTask(seqName, taskName, taskDuration, taskIndex)}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      borderColor: 'grey',
      borderWidth: 1
   }
});

export default TaskCreateInput;
