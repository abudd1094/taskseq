import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { getData } from "../api/asyncStorage";
import DisplayTable from "../components/atoms/DisplayTable";

const CompletionLogScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  useEffect(() => {
    console.log("DEBUG");
    console.log(data.map((obj) => Object.keys(obj)[0]));
  }, [data]);

  return (
    <View style={styles.container}>
      {data.map((obj) => (
        <DisplayTable
          seq={Object.keys(obj)[0]}
          datesArr={obj[Object.keys(obj)[0]]}
        />
      ))}
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
