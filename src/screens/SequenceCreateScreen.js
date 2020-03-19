import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { db } from "../api/sqlite";

const SequenceCreateScreen = () => {
   const [seq, setSeq] = useState("");
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState(null);

   useEffect(() => {
      console.log("seq create screen loaded");
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
               console.log(res);
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };

   let insertTestRow = 'INSERT INTO TaskTable (seq, taskName, taskDuration) VALUES("testSeq", "testTaskName", "60")';
   let fetchSql = 'SELECT seq, taskName, taskDuration FROM TaskTable';
   let deleteSql = 'DELETE FROM TaskTable WHERE seq="testseqtwo"';

   const createSeq = async (column, table) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `${insertSql}`,
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

   const deleteSeq = async () => {
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


   return (
      <View>
         <Text>Create a task sequence:</Text>
         <Text>{seq}</Text>
         <Button title="CREATE" onPress={createSeq} />
         <Button title="DELETE" onPress={deleteSeq} />
      </View>
   )
};

const styles = EStyleSheet.create({});

export default SequenceCreateScreen;
