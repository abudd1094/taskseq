import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { lightGrey } from "../../styles/colors";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, callback, small, active }) => {
   const { state } = useContext(Context);
   const [ minutes, setMinutes ] = useState(0);
   const [ seconds, setSeconds ] = useState(0);

   const decrementTime = async () => {
      if (state.timerOn && active) {
         if (seconds > 0) {
            setTimeout(() => {
               setSeconds(seconds - 0.25)
            }, 250)
         } else if (seconds === 0 && minutes > 0) {
            setTimeout(() => {
               setMinutes(minutes - 1);
               setSeconds(59.75);
            }, 250)
         } else {
            callback && callback();
            setMinutes(0);
            setSeconds(0);
         }
      }
   };

   const setTimerToDuration = () => {
      if (duration >= 60) {
         setMinutes(Math.floor(duration/60));
         setSeconds(duration % 60);
      } else {
         setMinutes(0);
         setSeconds(duration);
      }
   };

   useEffect(() => {
      decrementTime();
   });

   useEffect(() => {
      setTimerToDuration(duration);
   }, [duration]);

   return (
      <View>
         <Text style={[styles.timer, small ? styles.small : styles.large]}>{minutes > 0 && minutes + ':'}{(seconds < 10 && minutes > 0) && 0}{Math.abs(seconds).toFixed(0)}</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   inactive: {
      color: lightGrey,
   },
   large: {
      fontSize: 30,
   },
   small: {
      fontSize: 14,
   },
   timer: {
      ...Typography.primaryFont,
      textAlign: 'center',
   },
});

export default Timer;
