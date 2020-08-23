import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const CompletionLogScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Logs</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
});
export default CompletionLogScreen;
