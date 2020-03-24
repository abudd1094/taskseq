import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from '../components/atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [seq, setSeq] = useState("");
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      setSeq(currentSeq);
   }, []);

   const loadSeqData = async () => {

   };

   return (
      <View style={styles.container}>
         <Text>{seq}</Text>
         <Timer duration="60" />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      ...Spacing.container,
      justifyContent: 'space-around',
      height: '50%'
   }
});

export default SequenceScreen;
