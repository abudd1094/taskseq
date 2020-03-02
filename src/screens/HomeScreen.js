import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Spacing } from "../styles";

const HomeScreen = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Text>Task Sequencer 1.0.0</Text>
         <Text
            style={styles.link}
            onPress={() => navigation.navigate('Test')}
         >Go to the test screen...</Text>
      </View>
   )
};

const styles = EStyleSheet.create({
   container: {
      ...Spacing.container
   },
   link: {
      ...Colors.blue
   }
});

export default HomeScreen;