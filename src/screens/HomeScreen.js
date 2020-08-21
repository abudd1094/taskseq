import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Spacing, Typography } from "../styles";
import MenuButton from "../components/MenuButton";
import { windowWidth } from "../styles/spacing";
import { Context } from "../context/SequenceContext";

const HomeScreen = ({ navigation }) => {
   const { state } = useContext(Context);
   return (
      <View style={[styles.container, {backgroundColor: state.colorScheme[2]}]}>
         <Text style={styles.title}>Task Sequencer 1.0.0</Text>
         <View style={styles.subcontainer}>
            <MenuButton text={'SEQUENCES'} onPress={() => navigation.navigate('Sequences')} bgColor={state.colorScheme[0]} textColor={state.colorScheme[3]} />
            {/* <MenuButton text={'SETTINGS'} onPress={() => navigation.navigate('Settings')} bgColor={state.colorScheme[1]} textColor={state.colorScheme[3]} /> */}
         </View>
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
      alignItems: 'center',
      flex: 1,
      paddingTop: '50%',
   },
   subcontainer: {
      marginTop: '33%',
      width: windowWidth,
   },
   title: {
      color: 'black',
      ...Typography.primaryFont,
      ...Typography.h1
   }
});

export default HomeScreen;
