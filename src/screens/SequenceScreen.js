import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from "../components/atoms/Button";
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from '../styles';
import { cadetBlue, lightGrey, pastelGreen } from "../styles/colors";
import { Context } from "../context/SequenceContext";
import Timer from "../components/atoms/Timer";
import Task from "../components/molecules/Task";

const SequenceScreen = ({ navigation }) => {
   const { state, loadCurrentTasks, setCurrentTask, setTimer } = useContext(Context);
   const {timerOn} = state;
   const [ count, setCount ] = useState(0);
   const [ reset, setReset ] = useState(false);
   const [ complete, setComplete ] = useState(false);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit')}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount, state.currentSeq ]);

   useEffect(() => {
      loadCurrentTasks(state.currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         loadCurrentTasks(state.currentSeq);
      });

      return unsubscribe;
   }, [navigation, state.currentSeq]);

   const resetSequence = () => {
      setReset(true);
      setComplete(false);
      setTimeout(() => setReset(false), 1000)
   };

   const startStop = () => {
      timerOn
         ? setTimer(false)
         : setTimer(true)
   };

   const nextTask = () => {
      setCurrentTask(state.currentTask[state.currentTask.TaskIndex + 1])
   };

   if (state.loading || reset) {
      return(
         <Text>Loading...</Text>
      )
   } else {
      return (
         <View style={styles.container}>
            <View style={styles.top}>
               <Text style={[styles.title, styles.defaultMarginTop]}>{state.currentSeq}</Text>
               <Text style={{textAlign: 'center'}}>{state.currentTasks.length} Tasks</Text>
            </View>
            <Timer duration={state.currentTasks.map(task => task.TaskDuration).reduce((total, n) => total + n)} callback={() => setComplete(true)} />
            {!complete &&
            <Button
               color={timerOn ? cadetBlue : pastelGreen}
               title={timerOn ? 'STOP' : 'START'}
               onPress={startStop}
            />}
            <Button
               color={'red'}
               title={'RESET'}
               onPress={resetSequence}
            />
            <Button
               color={'blue'}
               title={'LOG'}
               onPress={() => console.log(state)}
            />
            <Task
               index={state.currentTask.TaskIndex}
               name={state.currentTask.TaskName}
               duration={state.currentTask.TaskDuration}
               current
               active={true}
            />
            {state.currentTasks.filter(task => task !== state.currentTask).map((task, index) =>
               <Task
                  index={task.TaskIndex}
                  name={task.TaskName}
                  duration={task.TaskDuration}
                  callback={nextTask}
                  active={false}
                  key={index}
               />
            )}
         </View>
      )
   }
};

const styles = EStyleSheet.create({
   bottom: {
      flex: 0.25,
   },
   button: {
      fontSize: 17,
      marginRight: 10,
   },
   buttonDefault: {
      backgroundColor: 'red',
   },
   container: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      height: '100%'
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   inactive: {
     color: lightGrey,
   },
   label: {
     color: 'red',
   },
   list: {
      flex: 3,
   },
   listText: {
      fontSize: 15,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
   },
   top: {
      alignSelf: 'center',
   }
});

export default SequenceScreen;
