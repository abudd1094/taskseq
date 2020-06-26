import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { windowWidth } from "../../styles/spacing";
import { Context } from "../../context/SequenceContext";

const Task = ({index, name, current, callback, duration, active}) => {
   const {state} = useContext(Context);
   const progress = useRef(new Animated.Value(0)).current;

   const fillProgressBar = () => {
      Animated.timing(progress, {
         toValue: windowWidth,
         duration: (progress.__getValue()) * 10 > 0 ? ((duration * 1000) - (progress.__getValue()) * 10 + 0.5) : (duration * 1000),
      }).start();
   };

   useEffect(() => {
      (active && state.timerOn) && fillProgressBar();
      (active && !state.timerOn) && Animated.timing(progress).stop();
   }, [active, state.timerOn]);

   return (
      <View style={[styles.container, current ? {backgroundColor: state.colorScheme[2]} : styles.default]} key={index} >
         <Animated.View style={[styles.progressBar, {width: progress, backgroundColor: state.colorScheme[4]}]} />
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
      position: 'absolute',
      height: 20,
   },
   white: {
      color: 'white'
   },
});

export default Task;
