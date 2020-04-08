import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import Input from "../atoms/Input";

const TaskCreateInput = ({contextCallback, seq}) => {
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState("");

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
            onChangeText={string => setTaskDuration(string)}
            style={[styles.inputDuration, styles.defaultMarginBottom]}
         />
         <Button
            title="Add Task"
            onPress={() => contextCallback(seq, taskName, taskDuration)}
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
