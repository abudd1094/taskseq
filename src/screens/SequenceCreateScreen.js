import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing } from "../styles";
import Input from '../components/atoms/Input';
import TaskCreateInput from "../components/molecules/TaskCreateInput";
import { Context } from "../context/SequenceContext";

const SequenceCreateScreen = () => {
   const [seq, setSeq] = useState("");
   const [seqDefined, setSeqDefined] = useState(false);
   const [taskName, setTaskName] = useState([]);
   const [taskDuration, setTaskDuration] = useState([]);
   const { state, SequenceCreate } = useContext(Context);

   let sqlStatement = '';

   useEffect(() => {
      console.log("seq create screen loaded");
   }, []);

   return (
      <View style={[styles.defaultMargin, styles.container]}>
         <View>
            <Input
               label="Sequence name:"
               value={seq}
               onChangeText={string => {
                  setSeq(string);
                  setSeqDefined(false);
               }}
               style={styles.defaultMarginBottom}
               conditionalStyle={seqDefined ? styles.seqDefined : styles.seqUndefined}
            />
            <FlatList
               data={state || {}}
               keyExtractor={(seq) => seq}
               style={styles.marginTop}
               renderItem={item => {
                  <View>
                     <Text>{item}</Text>
                  </View>
               }}
            />
            <Button
               title="Set Sequence Name"
               onPress={() => setSeqDefined(true)}
            />
         </View>
         <TaskCreateInput
            seq={seq}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "flex-start"
   },
   defaultMargin: {
      ...Spacing.defaultMargin
   },
   defaultMarginBottom: {
      ...Spacing.defaultMarginBottom
   },
   seqDefined: {
      color: 'red'
   },
   seqUndefined: {
      color: 'black'
   }
});

export default SequenceCreateScreen;
