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
      console.log(seqList)
   }, []);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `SELECT seq FROM TaskTable`,
            [],
            function (tx, res) {
               console.log('data loaded');
               setSeqList(res.rows.item(0).seq);

            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   let deleteSql = 'DELETE FROM TaskTable WHERE seq="testseqtwo"';

   const deleteTask = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `${deleteSql}`,
            [],
            function (tx, res) {
               let sqlTable = res.rows;
               console.log('seq deleted');
               console.log(res)
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
            <Text>{seqList}</Text>
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
