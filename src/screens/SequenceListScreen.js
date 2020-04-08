import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Spacing } from "../styles";
import { db } from "../api/sqlite";
import { Context } from '../context/SequenceContext';

const SequenceListScreen = ({ navigation }) => {
   const [ count, setCount ] = React.useState(0);
   const [ seqList, setSeqList ] = useState(["initialSeq"]);
   const { state, getSequences } = useContext(Context);


   useEffect(() => {
      console.log('seq list screen')

      getSequences().then(console.log(state))
      const listener = navigation.addListener('didFocus', () => {
         getSequences()
      });

      return listener;
   }, [navigation]);

   const updateState = newData => {
      if (!seqList.includes(newData)) {
         setSeqList([...seqList, newData]);
      }
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
            <TouchableOpacity onPress={() => navigation.navigate('SequenceCreate')}>
               <Text style={styles.button}>+</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
            <FlatList
               data={state}
               keyExtractor={(seq) => seq}
               style={styles.marginTop}
               renderItem={({item}) => <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ViewSequence', {currentSeq: item})}><Text style={styles.listText}>{item}</Text></TouchableOpacity>}
            />
      </View>
   )
};

const styles = EStyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
      },
      link: {
         ...Colors.blue
      },
      button: {
         ...Colors.blue,
         fontSize: '1.5rem',
         marginRight: '1rem'
      },
      marginTop: {
        ...Spacing.defaultMarginTop
      },
      listItem: {
         ...Spacing.defaultMarginBottom
      },
      listText: {
         fontSize: 15,
            ...Colors.blue
      }
   })
;

export default SequenceListScreen;
