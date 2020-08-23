import React, { useContext } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from "../styles";
import MenuButton from "../components/MenuButton";
import { windowWidth } from "../styles/spacing";
import { Context } from "../context/SequenceContext";
import { db } from "../api/sqlite";

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  return (
    <View style={[styles.container, { backgroundColor: state.colorScheme[2] }]}>
      <Text style={[styles.title, { color: state.colorScheme[1] }]}>
        Task Sequencer
      </Text>
      <Text style={[styles.version, { color: state.colorScheme[3] }]}>
        1.0.0
      </Text>
      <View style={styles.subcontainer}>
        <MenuButton
          text={"SEQUENCES"}
          onPress={() => navigation.navigate("Sequences")}
          bgColor={state.colorScheme[3]}
          textColor={state.colorScheme[0]}
        />
        <MenuButton
          text={"COMPLETION LOG"}
          onPress={() => navigation.navigate("CompletionLog")}
          bgColor={state.colorScheme[0]}
          textColor={state.colorScheme[3]}
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  subcontainer: {
    width: windowWidth,
  },
  title: {
    color: "black",
    ...Typography.primaryFont,
    fontSize: 30,
  },
  version: {
    color: "white",
    ...Typography.primaryFont,
    fontSize: 20,
    marginBottom: 100,
  },
});

export default HomeScreen;
