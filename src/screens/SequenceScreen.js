import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Button from "../components/atoms/Button";
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from '../styles';
import { cadetBlue, lightGrey, pastelGreen } from "../styles/colors";
import { Context } from "../context/SequenceContext";
import Timer from "../components/atoms/Timer";
import Task from "../components/molecules/Task";
import { windowWidth } from "../styles/spacing";

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
      setCurrentTask(state.currentTasks[0]);
      setComplete(false);
      setTimeout(() => setReset(false), 500)
   };

   const startStop = () => {
      timerOn
         ? setTimer(false)
         : setTimer(true)

   };

   const nextTask = () => {
      if (state.currentTask.TaskIndex < state.currentTasks.length) {
         setCurrentTask(state.currentTasks[state.currentTask.TaskIndex])
      } else {
         setTimer(false);
         setComplete(true);
      }
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
            <View style={styles.middle}>
               {state.currentTasks.length > 0 &&
               <Timer
                  duration={state.currentTasks && state.currentTasks.map(task => task.TaskDuration).reduce((total, n) => total + n)}
                  active={state.timerOn}
               />}
               <View style={styles.buttonContainer}>
                  <Button
                     color={'red'}
                     title={'RESET'}
                     onPress={resetSequence}
                     style={styles.buttonReset}
                  />
                  {complete
                     ? <Text style={styles.buttonStartText}>Complete!</Text>
                     : <Button
                        color={timerOn ? cadetBlue : pastelGreen}
                        title={timerOn ? 'STOP' : 'START'}
                        onPress={startStop}
                        style={styles.buttonStart}
                     />
                  }
               </View>
            </View>
            {state.currentTasks.map((task, index) =>
               <Task
                  index={task.TaskIndex}
                  name={task.TaskName}
                  duration={task.TaskDuration}
                  callback={nextTask}
                  current={index + 1 === state.currentTask.TaskIndex}
                  active={index + 1 === state.currentTask.TaskIndex}
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
   buttonContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      width: windowWidth,
   },
   buttonDefault: {
      backgroundColor: 'red',
   },
   buttonReset: {
     flex: 1,
   },
   buttonStart: {
     flex: 4,
   },
   buttonStartText: {
      alignItems: 'center',
      backgroundColor: 'yellow',
      flex: 4,
      textAlign: 'center'
   },
   container: {
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
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
   middle: {

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
