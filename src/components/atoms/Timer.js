import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { lightGrey } from "../../styles/colors";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, callback }) => {
   const { state, setTimer } = useContext(Context);
   const { timerOn } = state;
   const [ minutes, setMinutes ] = useState(1);
   const [ seconds, setSeconds ] = useState(3);

   const decrementTime = async () => {
      if (timerOn) {
         if (seconds > 0) {
            setTimeout(() => {
               setSeconds(seconds - 1)
            }, 1000)
         } else if (seconds === 0 && minutes >= 0) {
            setTimeout(() => {
               setMinutes(minutes - 1);
               setSeconds(59);
            }, 1000)
         } else {
            setTimer(false);
            console.log('DONE!');
            callback && callback();
         }
      }
   };

   useEffect(() => {
      decrementTime()
   });

   return (
      <View>
         <Text style={styles.timer}>{minutes > 0 && minutes + ':'}{seconds < 10 && 0}{seconds}</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   inactive: {
      color: lightGrey,
   },
   timer: {
      fontSize: 30,
      ...Typography.primaryFont,
      textAlign: 'center',
   },
});

export default Timer;
