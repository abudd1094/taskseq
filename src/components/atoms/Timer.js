import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";

const Timer = ({ callback, duration, startTimer }) => {
   const [ minutes, setMinutes ] = useState(0);
   const [ seconds, setSeconds ] = useState(0);
   const [ timerOn, setTimer ] = useState(startTimer);

   const decrementTime = async () => {
      if (timerOn) {
         if (minutes === 0 && seconds === 0) {
            setTimer(false);
            await callback();
         }
         if (minutes > 0 && seconds === 0) {
            setTimeout(() => {
               setMinutes(minutes - 1);
               setSeconds(59);
            }, 1000)
         }
         if (seconds > 0) {
            setTimeout(() => {
               setSeconds(seconds - 1)
            }, 1000)
         }
      }
   };

   function setTimeToDuration() {
      if (duration < 60) {
         setSeconds(duration)
      } else {
         setMinutes(Math.floor(duration / 60));
         setSeconds(duration % 60)
      }
   }

   useEffect(() => {
      setTimeToDuration()
   }, [ duration ]);

   useEffect(() => {
      decrementTime()
   });

   useEffect(() => {
      setTimer(startTimer)
   }, [startTimer, minutes, duration]);

   return (
      <View>
         <Text style={styles.timer}>{minutes > 0 && minutes + ':'}{seconds < 10 && 0}{seconds}</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   timer: {
      ...Typography.primaryFont,
      fontSize: 60,
      textAlign: 'center',
   }
});

export default Timer;
