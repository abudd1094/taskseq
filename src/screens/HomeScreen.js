import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing, Typography } from "../styles";

const HomeScreen = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Task Sequencer 1.0.0</Text>
         <Text
            style={[ styles.link ]}
            onPress={() => navigation.navigate('Sequences')}
         >
            ENTER
         </Text>
      </View>
   )
};

HomeScreen.navigationOptions = () => {
   return {
      headerShown: false
   }
};

const styles = EStyleSheet.create({
   container: {
      ...Spacing.container,
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   link: {
   },
   title: {
      ...Typography.primaryFont,
      ...Typography.h1
   }
});

export default HomeScreen;
