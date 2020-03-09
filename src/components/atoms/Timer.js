import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Timer = (duration) => {
   const [ time, setTime ] = useState(60);
   const [ timerOn, toggleTimer ] = useState(false);

   function startCountdown() {
      if (timerOn && time > 0) {
         setTimeout(() => {
            setTime(time - 1)
         }, 1000)
      }
   }

   useEffect(() => {
      startCountdown()
   });

   return (
      <View>
         <Text>{time}</Text>
      </View>
   )
};

const styles = StyleSheet.create({});

export default Timer;
