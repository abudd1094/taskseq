import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { lightGrey } from "../../styles/colors";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, callback, small, style, active }) => {
   const { state } = useContext(Context);
   // const [ minutes, setMinutes ] = useState(0);
   // const [ seconds, setSeconds ] = useState(0);
   // const minuteFunction = function() {
   //    let executed = false;
   //    return function() {
   //       if (!executed) {
   //          executed = true;
   //          setMinutes(minutes - 1);
   //       }
   //    }
   // };

   const setLocalTimer = async () => {

   };

   return (
      <View style={styles.container}>
         <Text style={[styles.timer, small ? styles.small : styles.large, style && style, active && {color: 'white'}]}>{duration}</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
     flexDirection: 'row'
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
