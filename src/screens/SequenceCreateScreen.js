import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from "../api/sqlite";

const SequenceCreateScreen = () => {
   useEffect(() => {
      console.log("seq create screen loaded");
      loadData();
   }, []);

   let tt = "taskDuration"

   const loadData = async (column, table) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `SELECT ${tt} FROM TaskTable`,
            [],
            function (tx, res) {
               console.log('statement success');
               console.log(res);
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
      </View>
   )
};

const styles = StyleSheet.create({});

export default SequenceCreateScreen;
