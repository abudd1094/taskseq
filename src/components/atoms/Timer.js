import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";

const Timer = ({ duration, callback }) => {
   const [ time, setTime ] = useState(0);
   const [ timerOn, setTimer ] = useState(false);

   const decrementTime = async () => {
      if (timerOn && time === 0) {
         setTimer(false);
         await callback()
      }
      if (timerOn && time > 0) {
         setTimeout(() => {
            setTime(time - 1)
         }, 1000)
      }
   };

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
            setTimer(true)
         }}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   timer: {
      ...Typography.primaryFont,
      fontSize: 80,
      textAlign: 'center',
   }
});

export default Timer;
