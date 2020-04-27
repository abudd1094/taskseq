import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Context } from "../context/SequenceContext";
import TaskCreateInput from "../components/molecules/TaskCreateInput";

const TaskCreateScreen = ({ route, navigation }) => {
   const {seqName} = route.params;
   const { state, getSeq, createTask } = useContext(Context);

   useEffect(() => {
      console.log("seq create screen loaded");
      getSeq(seqName)
   }, []);

   return (
      <View style={styles.container}>
         <Text>Add tasks to {seqName}</Text>
         <FlatList
            data={state}
         />
         <TaskCreateInput seqName={seqName}/>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 20
   }
});

export default TaskCreateScreen;
