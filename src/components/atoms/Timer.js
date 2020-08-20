import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { lightGrey } from "../../styles/colors";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, seqDuration, callback, small, style, active }) => {
   const { state } = useContext(Context);
   const localTimer = state.masterTimer - (seqDuration - duration);

   const displayLocalTimer = () => {
      if (state.timerOn && active && localTimer > 0) {
         return localTimer;
      } else if (state.timerOn && localTimer <= 0) {
         return 0;
      } else {
         return duration;
      }
   };

   useEffect(() => {
      localTimer === 0 ? active = false : console.log('decr.');
   });

   return (
     <View style={styles.container}>
       <Text
         style={[
           styles.timer,
           small ? styles.small : styles.large,
           style && style,
           active && { color: "white" },
         ]}
       >
         {displayLocalTimer()}
       </Text>
     </View>
   );
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
