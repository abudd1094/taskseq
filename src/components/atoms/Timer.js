import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Typography } from "../../styles";
import { lightGrey } from "../../styles/colors";

const Timer = ({ callback, color, duration, startTimer, fontSize, basic, reset }) => {
   const [ minutes, setMinutes ] = useState(0);
   const [ seconds, setSeconds ] = useState(0);
   const [ timerOn, setTimer ] = useState(startTimer);

   const decrementTime = async () => {
      if (timerOn) {
         if (seconds > 0) {
            setTimeout(() => {
               setSeconds(seconds - 1)
            }, 1000)
         }
         else if (minutes >= 0 && seconds === 0) {
            setTimeout(() => {
               setMinutes(minutes - 1);
               setSeconds(59);
            }, 1000)
         }
         else if (minutes === 0 && seconds === 0) {
            setTimer(false);
            await callback();
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
   }, [ duration, reset ]);

   useEffect(() => {
      decrementTime()
   });

   useEffect(() => {
      setTimer(startTimer)
   }, [startTimer, minutes, duration]);

   if (basic) {
      return (
         <View>
            <Text style={[{fontSize: fontSize}, styles.timerBasic, !timerOn ? styles.inactive : {color: color}]}>{minutes > 0 && minutes + ':'}{seconds < 10 && 0}{seconds}</Text>
         </View>
      )
   } else {
      return (
         <View>
            <Text style={[{fontSize: fontSize}, styles.timer, !timerOn ? styles.inactive : {color: color}]}>{minutes > 0 && minutes + ':'}{seconds < 10 && 0}{seconds}</Text>
         </View>
      )
   }
};

const styles = EStyleSheet.create({
   color: {

   },
   inactive: {
      color: lightGrey,
   },
   timer: {
      ...Typography.primaryFont,
      textAlign: 'center',
   },
   timerBasic: {
      textAlign: 'center',
   }
});

export default Timer;
