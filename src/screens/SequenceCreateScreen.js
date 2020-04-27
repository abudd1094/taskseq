import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing } from "../styles";
import Input from '../components/atoms/Input';
import { Context } from "../context/SequenceContext";

const SequenceCreateScreen = ({ navigation }) => {
   const [ count, setCount ] = React.useState(0);
   const [seqName, setSeqName] = useState("");
   const { state, createSeq } = useContext(Context);

   useEffect(() => {
      console.log("seq create screen loaded");
   }, []);

   return (
      <View style={[styles.defaultMargin, styles.container]}>
         <Input
            label="Sequence name: "
            value={seqName}
            onChangeText={string => {
               setSeqName(string);
            }}
            style={styles.defaultMarginBottom}
         />
         <Button
            title="Set Sequence Name"
            onPress={() => createSeq(seqName).then(navigation.navigate('TaskCreate', {seqName: seqName}))}
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
