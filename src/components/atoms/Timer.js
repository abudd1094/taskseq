import React, { useContext, useState } from "react";
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, seqDuration, indexedDuration, callback, small, style, active, reset }) => {
   const { state } = useContext(Context);
   const [taskComplete, setTaskComplete] = useState(false);
   let localTimer = state.masterTimer - (indexedDuration - duration);

   const displayLocalTimer = () => {
      if (taskComplete) {
         return 0;
      } else {
         if (active) {
            if (localTimer >= 0) {
               return localTimer;
            } else {
               setTaskComplete(true)
               callback();
               return 0;
            }
         } else {
            return duration;
         }
      }
   };

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
