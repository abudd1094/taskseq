import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { getData, initializeData } from "../api/asyncStorage";
import DisplayTable from "../components/atoms/DisplayTable";
import Button from "../components/atoms/Button";

const CompletionLogScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const initializeLog = () => {
    Alert.alert(
      "Initialize Log",
      "Are you sure?",
      [
        {
          text: "YES",
          onPress: () => {
            initializeData();
            setData([]);
          },
        },
        {
          text: "NO",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    getData().then((res) => setData(res));
  }, [data]);

  return (
    <View style={styles.container}>
      {data.map((obj, index) => (
        <DisplayTable
          seq={Object.keys(obj)[0]}
          datesArr={obj[Object.keys(obj)[0]]}
          key={index}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button
          color={"red"}
          title={"INITIALIZE LOG"}
          onPress={initializeLog}
          style={styles.buttonReset}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-end",
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
  },
  buttonReset: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default CompletionLogScreen;
