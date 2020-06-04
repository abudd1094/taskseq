import React from 'react';
import { Text, View } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing } from "../../styles";
import { windowWidth } from "../../styles/spacing";

const Task = ({name, callback, duration, startTimer}) => {
   return (
      <View style={styles.container}>
         <Text>{name}</Text>
         <Timer callback={callback} duration={duration} fontSize={16} basic startTimer={startTimer}/>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      alignItems: 'center',
     flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '1rem',
      width: windowWidth,
   }
});

export default Task;
