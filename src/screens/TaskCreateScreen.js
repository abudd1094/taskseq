import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing } from "../styles";
import Input from '../components/atoms/Input';
import { Context } from "../context/SequenceContext";
import TaskCreateInput from "../components/molecules/TaskCreateInput";

const TaskCreateScreen = ({ route, navigation }) => {
   const {seqName} = route.params;
   const [ count, setCount ] = React.useState(0);
   const { state, createTask } = useContext(Context);

   useEffect(() => {
      console.log("seq create screen loaded");
   }, []);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Sequences')}>
               <Text style={styles.button}>Back</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View>
         <Text>Add tasks to {seqName}</Text>
         <TaskCreateInput seqName={seqName}/>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      borderColor: 'grey',
      borderWidth: 1
   }
});

export default TaskCreateScreen;
