import React, {useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Task from "../molecules/Task";
import { Colors, Spacing } from "../../styles";

const TaskList = (tasks) => {
   useEffect(() => {
      console.log(tasks)
      console.log(typeof(tasks))
   }, []);

   return (
      <View style={styles.container}>

      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   marginTop: {
      ...Spacing.defaultMarginTop
   },
   listItem: {
      ...Spacing.defaultMarginBottom
   },
   listText: {
      fontSize: 15,
      ...Colors.blue
   }
});

export default TaskList;
