import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from "../styles";
import { db } from "../api/sqlite";

const SequenceListScreen = ({ navigation }) => {
   const [ count, setCount ] = React.useState(0);
   const [ seqList, setSeqList ] = useState([]);

   useEffect(() => {
      console.log("seq list screen loaded");
      loadData();
      console.log(db)
   }, []);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `SELECT seq, taskName, taskDuration FROM TaskTable`,
            [],
            function (tx, res) {
               console.log('data loaded');
               console.log(res.rows.item(0));
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
               <Text style={styles.button}>+</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => navigation.navigate('ViewSequence')}>
            <Text>View this Sequence</Text>
         </TouchableOpacity>
      </View>
   )
};

const styles = EStyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center'
      },
      link: {
         ...Colors.blue
      },
      button: {
         ...Colors.blue,
         fontSize: '1.5rem',
         marginRight: '1rem'
      }
   })
;

export default SequenceListScreen;
