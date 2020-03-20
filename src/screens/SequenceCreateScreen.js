import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { db } from "../api/sqlite";

const SequenceCreateScreen = () => {
   const [seq, setSeq] = useState("");
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState(null);

   let insertTestRow = 'INSERT INTO TaskTable (seq, taskName, taskDuration) VALUES("testSeq", "testTaskName", "60")';

   useEffect(() => {
      console.log("seq create screen loaded");
      console.log(db)
   }, []);

   const createTask = async (column, table) => {
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

   return (
      <View>
         <Text>Create a task sequence:</Text>
         <Text>{seq}</Text>
         <Button title="CREATE" onPress={createTask} />
      </View>
   )
};

const styles = EStyleSheet.create({});

export default SequenceCreateScreen;
