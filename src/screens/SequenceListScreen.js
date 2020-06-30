import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing } from "../styles";
import { Context } from "../context/SequenceContext";
import MenuButton from "../components/MenuButton";

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
         <View style={[styles.container, {backgroundColor: state.colorScheme[2]}]}>
            {state.sequences.map((item, index) =>
               <MenuButton bgColor={state.colorScheme[index % 2 === 0 ? 0 : 1]} textColor={state.colorScheme[3]} onPress={() => enterSequence(item)} key={index} text={item.name}/>
            )}
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
