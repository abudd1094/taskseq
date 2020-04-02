import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { db } from "../api/sqlite";
import { Spacing } from "../styles";
import Input from '../components/atoms/Input';
import TaskCreateInput from "../components/molecules/TaskCreateInput";
import { Context } from "../context/SequenceContext";
import { windowWidth } from "../styles/spacing";

const SequenceCreateScreen = () => {
   const [seq, setSeq] = useState("");
   const [taskName, setTaskName] = useState("");
   const [taskDuration, setTaskDuration] = useState("");
   const { state, createSequence } = useContext(Context);

   let sqlStatement = '';

   useEffect(() => {
      console.log("seq create screen loaded");
      createSequence()
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

   const createSequence2 = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            `${sqlStatement}`,
            [],
            function (tx, res) {
               let sqlTable = res.rows;
               console.log('seq created');
               console.log(res.rows.length);
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
               onChangeText={string => setSeq(string)}
               style={styles.defaultMarginBottom}
            />
            <TaskCreateInput
               createTaskCallback={console.log('task callback fired')}
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
      justifyContent: "space-between"
   },
   defaultMargin: {
      ...Spacing.defaultMargin
   },
   defaultMarginBottom: {
      ...Spacing.defaultMarginBottom
   },
   inputContainer: {
      flexDirection: 'row',
   },
   inputDuration: {
      flex: 1
   },
   inputName: {
      flex: 4
   }
});

export default SequenceCreateScreen;
