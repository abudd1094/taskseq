import React, { useContext, useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, callback, small, style, active }) => {
  const { state, setMasterTimer, setTimer } = useContext(Context);

  const decrementTime = async () => {
    if (state.timerOn) {
      if (state.masterTimer > 0) {
        setTimeout(() => {
          setMasterTimer(state.masterTimer - 0.25);
        }, 250);
      } else {
        callback && callback();
      }
    }
  };

  useEffect(() => {
    decrementTime();
  });

  useEffect(() => {
    setMasterTimer(duration);
  }, [duration]);

  return (
    <View style={styles.container}>
      <Text>
        {state.masterTimer}
      </Text>
      <Button title="start" onPress={() => setTimer(true)} />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
  },
  large: {
    fontSize: 30,
  },
  small: {
    fontSize: 14,
  },
  timer: {
    ...Typography.primaryFont,
    textAlign: "center",
  },
});

export default Timer;
