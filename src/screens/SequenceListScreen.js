import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing } from "../styles";
import { Context } from "../context/SequenceContext";

const SequenceListScreen = ({ navigation }) => {
   const { state, loadSequences, setCurrentSeq, setLoading } = useContext(Context);
   const [ count, setCount ] = useState(0);

   const enterSequence = item => {
      setCurrentSeq(item.name);
      setLoading(true);
      navigation.navigate('ViewSequence');
   };

   useEffect( () => {
      loadSequences();

      const unsubscribe = navigation.addListener('focus', () => {
         loadSequences();
      });

      return unsubscribe;
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

   if (state.loading) {
      return <Text>Loading...</Text>
   } else {
      return (
         <View style={styles.container}>
            {state.sequences.map((item, index) =>
               <TouchableOpacity style={styles.listItem} onPress={() => enterSequence(item)} key={index}>
                  <Text style={styles.listText}>{item.name}</Text>
               </TouchableOpacity>
            )}
            <Button
               title="LOG APP STATE"
               onPress={() => console.log(state)}
            />
         </View>
      )
   }
};

const styles = EStyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
      },
      link: {
      },
      button: {
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
      }
   })
;

export default SequenceListScreen;
