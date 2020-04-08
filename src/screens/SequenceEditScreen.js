import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const SequenceEditScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   return (
     <View>
         <Text style={{textAlign: 'center', marginTop: 20}}>{currentSeq}</Text>
     </View>
   );
};

const styles = StyleSheet.create({});

export default SequenceEditScreen;
