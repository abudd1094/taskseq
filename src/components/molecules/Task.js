import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Text, View, Image } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { windowWidth } from "../../styles/spacing";
import { Context } from "../../context/SequenceContext";

const Task = ({index, name, current, callback, duration, seqDuration, indexedDuration, otherTasks, active, reset, small}) => {
   const {state} = useContext(Context);
   const progress = useRef(new Animated.Value(0)).current;

   const fillProgressBar = () => {
      Animated.timing(progress, {
        toValue: windowWidth,
        //  TO DO: duration is imperfect added duratino x 300 as offset to animation, needs tweaking
        duration:
          progress.__getValue() * 10 > 0
            ? duration * 100 - progress.__getValue() + duration * 300
            : duration * 1000 + duration * 300,
      }).start();
   };

   useEffect(() => {
      (active && state.timerOn) && fillProgressBar();
      (active && !state.timerOn) && Animated.timing(progress).stop();
   }, [active, state.timerOn]);

   return (
     <View
       style={[
         styles.container,
         {
           backgroundColor: current
             ? state.colorScheme[3]
             : state.colorScheme[1],
         },
       ]}
       key={index}
     >
       <Animated.View
         style={[
           styles.progressBar,
           { width: progress, backgroundColor: state.colorScheme[4] },
         ]}
       />
       <View style={styles.left}>
         {state.currentTask.TaskIndex > index ? (
           <Image
             style={styles.checkIcon}
             source={require("../../../assets/icons/check.png")}
           />
         ) : (
           <Text style={[styles.index, current && { color: "white" }]}>
             {index}
           </Text>
         )}
         <Text style={[styles.name, current && { color: "white" }]}>
           {name}
         </Text>
       </View>
       <Timer
         active={active}
         color={current ? "white" : "black"}
         callback={callback}
         duration={duration}
         seqDuration={seqDuration}
         indexedDuration={indexedDuration}
         otherTasks={otherTasks}
         reset={reset}
         small={!!small}
       />
     </View>
   );
};

const styles = EStyleSheet.create({
   checkIcon: {
     height: 14,
      marginRight: -5,
     width: 14,
   },
   container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '1rem',
      paddingVertical: 3,
      width: windowWidth,
   },
   index: {
     color: 'rgb(110,131,135)',
   },
   left: {
      flexDirection: 'row',
      width: '50%',
   },
   name: {
      paddingLeft: '1rem'
   },
   progressBar: {
      position: 'absolute',
      height: 25,
   },
   white: {
      color: 'white'
   },
});

export default Task;
