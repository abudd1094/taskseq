import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { db, formatSqlAllTaskSelect } from "../api/sqlite";
import Timer from "../components/atoms/Timer";

const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = useState(0);
   const [ state, setState ] = useState();
   const [ loading, setLoading ] = useState(true);

   const loadData = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(currentSeq),
            [],
            function (tx, res) {
               setState(res.rows._array.sort((a, b) => a.TaskIndex - b.TaskIndex));
               setLoading(false);
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
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit', {currentSeq: currentSeq})}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount, currentSeq ]);

   useEffect(() => {
      loadData();

      const unsubscribe = navigation.addListener('focus', () => {
         loadData();
      });

      return unsubscribe;
   }, [navigation, currentSeq]);

   return (
      <View style={styles.container}>
         <Text style={[styles.title, styles.defaultMarginTop]}>{currentSeq}</Text>
         <FlatList
            data={state}
            keyExtractor={(item) => item.TaskID ? item.TaskID.toString() : item.TaskName}
            style={styles.marginTop}
            renderItem={item => <Text>{item.item.TaskName}</Text>}
         />
         <Button
            title="log state"
            onPress={() => console.log(state)}
         />
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
      ...Spacing.container
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   listText: {
      fontSize: 15,
      ...Colors.blue
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      flex: 1
   }
});

export default SequenceScreen;
