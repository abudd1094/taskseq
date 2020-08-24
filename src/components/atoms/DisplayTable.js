import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DisplayTable = ({ seq, datesArr }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{seq}</Text>
      {datesArr.map((date) => (
        <Text style={styles.dates}>{date}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dates: {
    color: "grey",
    paddingLeft: 20,
  },
  title: {
    color: "black",
  },
});

export default DisplayTable;
