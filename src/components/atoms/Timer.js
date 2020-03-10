import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const Timer = ({ duration }) => {
   const [ time, setTime ] = useState(50);
   const [ timerOn, setTimer ] = useState(false);

   function decrementTime() {
      if (timerOn && time > 0) {
         setTimeout(() => {
            setTime(time - 1)
         }, 1000)
      }
   }

   function startTimer(bool) {
      setTimer(bool)
   }

   function setTimeToDuration() {
      setTime(duration)
   }

   useEffect(() => {
      setTimeToDuration()
   }, [ duration ]);

   useEffect(() => {
      decrementTime()
   });

   return (
      <View>
         <Text style={styles.timer}>{time}</Text>
         <Button
            title="start" onPress={() => {
            startTimer(true)
         }}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   timer: {
      fontSize: 80,
      textAlign: 'center',
      margin: '3.5rem'
   }
});

export default Timer;
