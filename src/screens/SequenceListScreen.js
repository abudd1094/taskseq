import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from "../styles";
import { db } from "../api/sqlite";

const SequenceListScreen = ({ navigation }) => {
   const [ count, setCount ] = React.useState(0);
   const [ seqList, setSeqList ] = useState(["initialSeq"]);

   useEffect(() => {
      loadData();
   }, [seqList]);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `SELECT seq FROM TaskTable`,
            [],
            function (tx, res) {
               console.log('data loaded');
               if (!seqList.includes(res.rows.item(0).seq)) {
                  setSeqList([...seqList, res.rows.item(0).seq]);
               }

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
            <FlatList
               data={seqList}
               keyExtractor={(seq) => seq}
               renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('ViewSequence', {currentSeq: item})}><Text>{item}</Text></TouchableOpacity>}
            />
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
