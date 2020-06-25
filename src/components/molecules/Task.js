import React, { useRef, useEffect, useState, useContext } from 'react';
import { Animated, Button, Text, View } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { windowWidth } from "../../styles/spacing";
import { Context } from "../../context/SequenceContext";

const Task = ({index, name, current, callback, duration, active}) => {
   const {state} = useContext(Context);
   const [progress, setProgress] = useState(new Animated.Value(0));

   const fillProgressBar = () => {
      Animated.timing(progress, {
         toValue: windowWidth,
         duration: 1000 * duration
      }).start();
   };

   useEffect(() => {
      (active && state.timerOn) && fillProgressBar();
   }, [active, state.timerOn]);

   return (
      <View style={[styles.container, current ? styles.current : styles.default]} key={index} >
         <Animated.View style={[styles.progressBar, {width: progress}]} />
         <View style={styles.left}>
            <Text style={[styles.index]}>{index}</Text>
            <Text style={[styles.name, current && styles.white]}>{name}</Text>
         </View>
         <Timer
            active={active}
            color={current ? 'white' : 'black'}
            callback={callback}
            duration={duration}
            small
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      alignItems: 'center',
     flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '1rem',
      width: windowWidth,
   },
   current: {
      backgroundColor: 'rgb(164,184,196)',
      color: 'rgb(12,202,74)'
   },
   default: {
      backgroundColor: 'rgb(252,250,250)',
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
      backgroundColor: 'green',
      position: 'absolute',
      height: 20,
   },
   white: {
      color: 'white'
   },
});

export default Task;
