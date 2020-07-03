import React, {useContext} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import { colorScheme1, colorScheme2 } from "../styles/colors";
import { Context } from "../context/SequenceContext";

const SettingsScreen = () => {
   const { state, setColorScheme } = useContext(Context);

   return (
      <View style={styles.container}>
         <View style={styles.subContainer}>
            <Text>Color Scheme:</Text>
            <TouchableOpacity style={styles.containerColorSchemes} onPress={() => setColorScheme(colorScheme1)}>
               <Text style={{marginRight: 20}}>Scheme 1</Text>
               {state.colorScheme.map((color, index) => <View key={index} style={[styles.colorTile, {backgroundColor: color}]}/>)}
            </TouchableOpacity>
         </View>
      </View>
   )
};

const styles = EStyleSheet.create({
   colorTile: {
      height: 20,
      width: 20,
   },
   container: {
      backgroundColor: 'white',
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
   },
   containerColorSchemes: {
      flexDirection: 'row',
      paddingVertical: 5,
   },
   subContainer: {
      justifyContent: 'space-between',
   }
});

export default SettingsScreen;
