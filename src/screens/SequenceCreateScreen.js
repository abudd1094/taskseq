import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { db } from "../api/sqlite";
import { Spacing } from "../styles";
import Input from '../components/atoms/Input';

const SequenceCreateScreen = () => {
   const [seq, setSeq] = useState("");
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState(null);

   let sqlStatement = '';
   let insertTestRow = 'INSERT INTO TaskTable (seq, taskName, taskDuration) VALUES("testSeq", "testTaskName", "60")';

   useEffect(() => {
      console.log("seq create screen loaded");
      console.log(db)
   }, []);

   const createTask = async (column, table) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `${sqlStatement}`,
            [],
            function (tx, res) {
               let sqlTable = res.rows;
               console.log('task created');
               console.log(res.rows.length)
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   const createSequence = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `${sqlStatement}`,
            [],
            function (tx, res) {
               let sqlTable = res.rows;
               console.log('seq created');
               console.log(res.rows.length)
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   return (
      <View style={[styles.defaultMargin, styles.container]}>
         <View>
            <Input
               label="Sequence name:"
               value={seq}
               onChangeText={text => setSeq(text)}
               style={styles.defaultMarginBottom}
            />
         </View>
         <Button
            title="CREATE"
            onPress={createSequence}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
      height: 100,
      justifyContent: "space-between"
   },
   defaultMargin: {
      ...Spacing.defaultMargin
   },
   defaultMarginBottom: {
      ...Spacing.defaultMarginBottom
   }
});

export default SequenceCreateScreen;
