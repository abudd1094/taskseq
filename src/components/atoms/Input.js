import React from 'react';
import { View, Text, TextInput } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const Input = ({label, value, onChangeText, conditionalStyle}) => {
   return (
      <View style={styles.container}>
         <Text>{label}</Text>
         <TextInput style={[styles.input, conditionalStyle]} value={value} onChangeText={onChangeText} />
      </View>
   )
};

const styles = EStyleSheet.create({
   input: {
      fontSize: 18,
      borderBottomWidth: 1,
      borderColor: 'black',
      marginBottom: 15,
      padding: 5,
      margin: 5,
   }
});

export default Input;
