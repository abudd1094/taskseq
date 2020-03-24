import React from 'react';
import { View, Text } from 'react-native';
import Timer from '../atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from "../../styles";
import { defaultMarginTop } from "../../styles/spacing";

const Task = ({name, duration}) => {
   return (
      <View style={styles.container}>
         <Text style={styles.defaultMarginTop}>{name}</Text>
         <Timer duration={duration} />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
     flex: 3,
      ...Spacing.defaultMarginBottom
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   }
});

export default Task;