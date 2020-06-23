import React from 'react';
import { Text, View } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { windowWidth } from "../../styles/spacing";

const Task = ({index, name, current, callback, duration, active}) => {
   return (
      <View style={[styles.container, current ? styles.current : styles.default]} key={index} >
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
   white: {
      color: 'white'
   },
});

export default Task;
