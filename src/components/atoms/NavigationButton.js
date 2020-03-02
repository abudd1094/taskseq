import React from 'react';
import { View, Text, Button } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const NavigationButton = () => {
   return (
      <View style={}>
         <Button
            onPress={() => {
               console.log("Button was pressed!")
            }}
            title="Press me!"
         />
      </View>
   )
};

const styles = EStyleSheet.create({});

export default NavigationButton;