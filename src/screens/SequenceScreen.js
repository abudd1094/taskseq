import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors, Spacing, Typography } from '../styles';
import { Context } from "../context/SequenceContext";


const SequenceScreen = ({ route, navigation }) => {
   const {currentSeq} = route.params;

   const [ count, setCount ] = React.useState(0);
   const { state, getSeq } = useContext(Context);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit', {currentSeq: currentSeq})}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   useEffect(() => {
      getSeq(currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         getSeq(currentSeq);
      });

      return unsubscribe;
   }, [navigation]);

   return (
      <View style={styles.container}>
         <Text style={[styles.title, styles.defaultMarginTop]}>{currentSeq}</Text>
         <FlatList
            data={state}
            keyExtractor={(item) => item.name}
            style={styles.marginTop}
            renderItem={item => <Text>{item.item.TaskName}</Text>}
         />
         <Button
            title="log state"
            onPress={() => console.log(state)}
         />
      </View>
   )
};

const styles = EStyleSheet.create({
   button: {
      ...Colors.blue,
      fontSize: 17,
      marginRight: '1rem'
   },
   container: {
      ...Spacing.container
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   listText: {
      fontSize: 15,
      ...Colors.blue
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
      flex: 1
   }
});

export default SequenceScreen;
