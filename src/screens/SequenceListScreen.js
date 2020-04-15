import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Spacing } from "../styles";
import { db } from "../api/sqlite";
import { Context } from '../context/SequenceContext';

const SequenceListScreen = ({ navigation }) => {
   const [ count, setCount ] = React.useState(0);
   const { state, getAllSeq, deleteSeq } = useContext(Context);


   useEffect(() => {
      getAllSeq()

      const listener = navigation.addListener('didFocus', () => {
         getAllSeq()
      });

      return listener;
   }, [navigation]);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceCreate')}>
               <Text style={styles.button}>+</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
            <FlatList
               data={state}
               keyExtractor={(seq) => seq}
               style={styles.marginTop}
               renderItem={({item}) => <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ViewSequence', {currentSeq: item})}><Text style={styles.listText}>{item}</Text></TouchableOpacity>}
            />
         <Button
            title="DELETE TABLE"
            onPress={() => deleteSeq("testTestTwo")}
         />
            <Button
               title="log state"
               onPress={() => console.log(state)}
            />
      </View>
   )
};

const styles = EStyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
      },
      link: {
         ...Colors.blue
      },
      button: {
         ...Colors.blue,
         fontSize: '1.5rem',
         marginRight: '1rem'
      },
      marginTop: {
        ...Spacing.defaultMarginTop
      },
      listItem: {
         ...Spacing.defaultMarginBottom
      },
      listText: {
         fontSize: 15,
            ...Colors.blue
      }
   })
;

export default SequenceListScreen;
