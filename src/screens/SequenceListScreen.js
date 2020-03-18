import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from "../styles";

const SequenceListScreen = ({ navigation }) => {
   const [ state, setState ] = useState();
   const [ count, setCount ] = React.useState(0);

   React.useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateSequence')}>
               <Text style={styles.button}>+</Text>
            </TouchableOpacity>
         ),
      });
   }, [ navigation, setCount ]);

   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => navigation.navigate('ViewSequence')}>
            <Text>View this Sequence</Text>
         </TouchableOpacity>
      </View>
   )
};

const styles = EStyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center'
      },
      link: {
         ...Colors.blue
      },
      button: {
         ...Colors.blue,
         fontSize: '1.5rem',
         marginRight: '1rem'
      }
   })
;

export default SequenceListScreen;
