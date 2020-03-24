import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Timer from '../components/atoms/Timer';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db } from "../api/sqlite";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = React.useState(0);
   const [seq, setSeq] = useState('');
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      loadSeqData();
   }, []);

   const formatSqlSelect = (seq) => {
      return "SELECT * FROM TaskTable WHERE seq=" + "'" + seq.toString() + "'";
   };

   const loadSeqData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSelect(currentSeq),
            [],
            function (tx, res) {
               setSeq(currentSeq);
               console.log("success");
               console.log(res);
               //updateState(res.rows.item(0).seq);
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateSequence')}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>{seq}</Text>
         <Timer duration="60" />
      </View>
   )
};

const styles = EStyleSheet.create({
   button: {
      ...Colors.blue,
      fontSize: 17,
      marginRight: '1rem'
   },
   container: {
      ...Spacing.container,
      justifyContent: 'space-around',
      height: '50%'
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
   }
});

export default SequenceScreen;
