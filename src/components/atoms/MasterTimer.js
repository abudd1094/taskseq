import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Typography } from "../../styles";
import { Context } from "../../context/SequenceContext";

const Timer = ({ duration, callback, small, style, active }) => {
  const { state, setMasterTimer, setTimer } = useContext(Context);

  const decrementTime = async () => {
    if (state.timerOn) {
      if (state.masterTimer > 0) {
        setTimeout(() => {
          setMasterTimer(state.masterTimer - 0.1);
        }, 100);
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
      <Text style={[styles.large, styles.timer]}>
        {Math.abs(state.masterTimer).toFixed(1)}
      </Text>
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
    color: "white",
    textAlign: "center",
  },
});

export default Timer;
