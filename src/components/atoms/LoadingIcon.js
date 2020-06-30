import React from 'react';
import { Animated, Image } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

const LoadingIcon = () => {
   return (
      <Animated.View style={styles.container}>
         <Image source={require('../../../assets/icons/loadWheel.gif')}/>
      </Animated.View>
   )
};

const styles = EStyleSheet.create({
   container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      opacity: 0.5,
      width: '100%',
   }
});

export default LoadingIcon;
