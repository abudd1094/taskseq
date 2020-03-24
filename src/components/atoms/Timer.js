import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";

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
      ...Typography.primaryFont,
      fontSize: 80,
      margin: '3.5rem',
      textAlign: 'center',
   }
});

export default Timer;
