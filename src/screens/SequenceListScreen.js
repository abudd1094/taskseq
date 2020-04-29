import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Spacing } from "../styles";
import { db, formatSqlAllSeqSelect } from "../api/sqlite";

const SequenceListScreen = ({ navigation }) => {
   const [ count, setCount ] = useState(0);
   const [ state, setState ] = useState();
   const [ loading, setLoading ] = useState(true);

   function loadData() {
      db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllSeqSelect(),
            [],
            function (tx, res) {
               setState(res.rows._array)
               setLoading(false)
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   useEffect( () => {
      loadData();

      const unsubscribe = navigation.addListener('focus', () => {
         loadData();
      });

      return unsubscribe;
   }, [navigation]);

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
         {!loading &&
         <FlatList
            data={state}
            keyExtractor={(item) => item.name}
            style={styles.marginTop}
            renderItem={({item}) => <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ViewSequence', {currentSeq: item.name})}><Text style={styles.listText}>{item.name}</Text></TouchableOpacity>}
         />
         }
         <Button
            title="log state"
            onPress={() => console.log(state)}
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
