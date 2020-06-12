import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from '../styles';
import { lightGrey } from "../styles/colors";
import { Context } from "../context/SequenceContext";
import Timer from "../components/atoms/Timer";

const SequenceScreen = ({ navigation }) => {
   const { state, loadCurrentTasks, setTimer } = useContext(Context);
   const [ count, setCount ] = useState(0);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SequenceEdit')}>
               <Text style={styles.button}>Edit</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount, state.currentSeq ]);

   useEffect(() => {
      loadCurrentTasks(state.currentSeq);

      const unsubscribe = navigation.addListener('focus', () => {
         loadCurrentTasks(state.currentSeq);
      });

      return unsubscribe;
   }, [navigation, state.currentSeq]);

   if (state.loading) {
      return(
         <Text>Loading...</Text>
      )
   } else {
      return (
         <View style={styles.container}>
            <View style={styles.top}>
               <Text style={[styles.title, styles.defaultMarginTop]}>{state.currentSeq}</Text>
               <Text style={{textAlign: 'center'}}>{state.currentTasks.length} Tasks</Text>
            </View>
            <Timer/>
            <Button
               title={'LOG'}
               onPress={() => console.log(state)}
            />
            <Button
               title={"START"}
               onPress={() => setTimer(true)}
            />
         </View>
      )
   }
};

const styles = EStyleSheet.create({
   bottom: {
      flex: 0.25,
   },
   button: {
      fontSize: 17,
      marginRight: 10,
   },
   buttonDefault: {
      backgroundColor: 'red',
   },
   container: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      height: '100%'
   },
   defaultMarginTop: {
      ...Spacing.defaultMarginTop
   },
   inactive: {
     color: lightGrey,
   },
   label: {
     color: 'red',
   },
   list: {
      flex: 3,
   },
   listText: {
      fontSize: 15,
   },
   title: {
      fontSize: 20,
      ...Typography.primaryFont,
   },
   top: {
      alignSelf: 'center',
   }
});

export default SequenceScreen;
