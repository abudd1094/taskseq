import React, { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../styles";
import { db, formatSqlSeqCreate } from "../api/sqlite";
import { Context } from "../context/SequenceContext";

const SequenceCreateScreen = ({ navigation }) => {
   const { setCurrentSeq } = useContext(Context);
   const [seq, setSeq] = useState('');

   const createSequence = async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqCreate(seq.toString()),
            [],
            function (tx, res) {
               console.log('SEQUENCE CREATED')
            },
            (tx, err) => {
               console.log('error creating sequence:');
               console.log(err);
            }
         );
      });
   };

   const saveAllChanges = () => {
      createSequence(seq.toString());
      setCurrentSeq(seq.toString());
   };

   return (
      <View style={styles.container}>
         <TextInput
            value={seq}
            placeholder={'Sequence Name'}
            style={styles.title}
            onChangeText={input => setSeq(input)}
         />
         <Button
            title="Create"
            onPress={async () => {
               await saveAllChanges();
               navigation.navigate('SequenceEdit');
            }}
         />
      </View>
   );
};

const styles = EStyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '100%',
      padding: 20,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      textAlign: 'center'
   }
});

export default SequenceCreateScreen;
