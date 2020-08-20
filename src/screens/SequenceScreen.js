import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from '../styles';
import { Context } from "../context/SequenceContext";
import { windowWidth } from "../styles/spacing";
import LoadingIcon from "../components/atoms/LoadingIcon";
import MasterTimer from "../components/atoms/MasterTimer";

const SequenceScreen = ({ navigation }) => {
   const { state, loadCurrentTasks, setCurrentTask, setTimer, loading } = useContext(Context);
   const {timerOn} = state;
   const [ count, setCount ] = useState(0);
   const [ reset, setReset ] = useState(false);
   const [ complete, setComplete ] = useState(false);
   const opacityAnim = useRef(new Animated.Value(0)).current;

   const fadeIn = () => {
      Animated.timing(opacityAnim, {
         toValue: 1,
         duration: 800,
      }).start();
   };

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
      Animated.timing(opacityAnim).reset();
      setTimeout(fadeIn, 500);
      loadCurrentTasks(state.currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         loadCurrentTasks(state.currentSeq);
      });

      return unsubscribe;
   }, [navigation, state.currentSeq, reset]);

   const resetSequence = () => {
      Animated.timing(opacityAnim).reset();
      setTimer(false);
      setReset(true);
      setCurrentTask(state.currentTasks[0]);
      setComplete(false);
      setTimeout(() => {
         setReset(false);
      }, 500)
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
         setComplete(true);
         setTimer(false);
      }
   };

   if (state.loading || reset) {
      return(
         <LoadingIcon/>
      )
   } else {
      return (
        <Animated.View
          style={[
            styles.container,
            { opacity: opacityAnim, backgroundColor: state.colorScheme[1] },
          ]}
        >
          <View style={[styles.top, { backgroundColor: state.colorScheme[3] }]}>
            <MasterTimer />
            <Text style={[styles.title, { color: "white" }]}>
              {state.currentSeq}
            </Text>
          </View>
        </Animated.View>
      );
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
      bottom: 0,
      flexDirection: 'row',
      position: 'absolute',
      width: windowWidth,
   },
   buttonTextContainer: {
      flexDirection: 'row',
      width: windowWidth,
   },
   buttonReset: {
      flex: 1,
      paddingVertical: 20,
   },
   buttonStart: {
      flex: 4,
      paddingVertical: 20,
   },
   buttonStartText: {
      alignItems: 'center',
      flex: 4,
      justifyContent: 'center',
      textAlign: 'center'
   },
   container: {
      alignItems: 'center',
      flex: 1,
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   statusBar: {
      bottom: 57,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
      position: 'absolute',
      width: '100%'
   },
   statusBarText: {
      ...Typography.primaryFont,
   },
   title: {
      fontSize: 22,
      ...Typography.primaryFont,
   },
   top: {
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 10,
      width: windowWidth
   }
});

export default SequenceScreen;
