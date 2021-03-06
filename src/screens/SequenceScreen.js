import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/atoms/Button";
import EStyleSheet from "react-native-extended-stylesheet";
import { Spacing, Typography } from "../styles";
import { cadetBlue, pastelGreen } from "../styles/colors";
import { Context } from "../context/SequenceContext";
import MasterTimer from "../components/atoms/MasterTimer";
import Task from "../components/molecules/Task";
import { windowWidth } from "../styles/spacing";
import LoadingIcon from "../components/atoms/LoadingIcon";
import { getData, storeData } from "../api/asyncStorage";

const SequenceScreen = ({ navigation }) => {
  const {
    state,
    loadCurrentTasks,
    setCurrentTask,
    setTimer,
    loading,
  } = useContext(Context);
  const { timerOn } = state;
  const [count, setCount] = useState(0);
  const [reset, setReset] = useState(false);
  const [complete, setComplete] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
    }).start();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("SequenceEdit")}>
          <Text style={styles.button}>Edit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, setCount, state.currentSeq]);

  const resetSequence = () => {
    Animated.timing(opacityAnim).reset();
    setTimer(false);
    setReset(true);
    setCurrentTask(state.currentTasks[0]);
    setComplete(false);
    setTimeout(() => {
      setReset(false);
    }, 500);
  };

  const startStop = () => {
    timerOn ? setTimer(false) : setTimer(true);
  };

  const nextTask = () => {
    if (state.currentTask.TaskIndex < state.currentTasks.length) {
      setCurrentTask(state.currentTasks[state.currentTask.TaskIndex]);
    } else {
      setComplete(true);
      setTimer(false);

      // LOG COMPLETION AS DATE TO ASYNC STORAGE OBJECT
      getData().then((res) => {
        try {
          const key = state.currentSeq;
          const d = new Date();

          if (res.filter((obj) => Object.keys(obj).includes(key)).length > 0) {
            res = res.map((obj) => {
              if (Object.keys(obj).includes(key)) {
                obj[key].push(d);
                storeData(res);
              }
            });
          } else {
            let object = {};
            object[key] = [d];

            res.push(object);
            storeData(res);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  useEffect(() => {
    Animated.timing(opacityAnim).reset();
    setTimeout(fadeIn, 500);
    loadCurrentTasks(state.currentSeq);

    const unsubscribe = navigation.addListener("focus", () => {
      loadCurrentTasks(state.currentSeq);
    });

    return unsubscribe;
  }, [navigation, state.currentSeq, reset]);

  if (state.loading || reset) {
    return <LoadingIcon />;
  } else {
    const seqDuration = state.currentTasks
      .map((task) => task.TaskDuration)
      .reduce((total, n) => total + n);
    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: opacityAnim, backgroundColor: state.colorScheme[1] },
        ]}
      >
        <View style={[styles.top, { backgroundColor: state.colorScheme[3] }]}>
          <Text style={[styles.title, { color: "white" }]}>
            {state.currentSeq}
          </Text>
          {state.currentTasks.length > 0 && (
            <MasterTimer
              duration={
                state.currentTasks &&
                state.currentTasks
                  .map((task) => task.TaskDuration)
                  .reduce((total, n) => total + n)
              }
              active={state.timerOn}
              style={{ color: "white" }}
            />
          )}
        </View>
        <View style={styles.currentTask}>
          <Text style={styles.currentTaskText}>
            {state.timerOn
              ? state.currentTask.TaskName
              : state.currentTasks.length + " tasks"}
          </Text>
        </View>
        <View style={styles.tasksContainer}>
          {state.currentTasks.map((task, index) => (
            <Task
              index={task.TaskIndex}
              name={task.TaskName}
              duration={task.TaskDuration}
              seqDuration={seqDuration}
              indexedDuration={state.currentTasks
                .filter((task) => task.TaskIndex > index)
                .map((task) => task.TaskDuration)
                .reduce((total, n) => total + n)}
              callback={nextTask}
              current={index + 1 === state.currentTask.TaskIndex}
              active={index + 1 === state.currentTask.TaskIndex}
              key={index}
              reset={reset}
              small
            />
          ))}
        </View>
        <View
          style={[styles.statusBar, { backgroundColor: state.colorScheme[3] }]}
        >
          <Text style={[styles.statusBarText, { color: "white" }]}>
            {complete
              ? "Sequence Completed"
              : state.currentTask.TaskIndex -
                1 +
                " / " +
                state.currentTasks.length}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={"red"}
            title={"RESET"}
            onPress={resetSequence}
            style={styles.buttonReset}
          />
          {complete ? null : (
            <Button
              color={timerOn ? cadetBlue : pastelGreen}
              title={timerOn ? "STOP" : "START"}
              onPress={startStop}
              style={styles.buttonStart}
            />
          )}
        </View>
      </Animated.View>
    );
  }
};

const styles = EStyleSheet.create({
  bottom: {
    flex: 0.25,
  },
  button: {
    fontSize: 17,
    marginRight: 10,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
    width: windowWidth,
  },
  buttonTextContainer: {
    flexDirection: "row",
    width: windowWidth,
  },
  buttonReset: {
    flex: 1,
    paddingVertical: 20,
  },
  buttonStart: {
    flex: 4,
    paddingVertical: 20,
  },
  buttonStartText: {
    alignItems: "center",
    flex: 4,
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  currentTask: {
    flex: 1,
    justifyContent: "center",
  },
  currentTaskText: {
    // ...Typography.primaryFont,
    fontSize: 25,
  },
  defaultMarginTop: {
    ...Spacing.defaultMarginTop,
  },
  progressBar: {
    position: "absolute",
    height: 25,
  },
  statusBar: {
    bottom: 57,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    position: "absolute",
    width: "100%",
  },
  statusBarText: {
    ...Typography.primaryFont,
  },
  tasksContainer: {
    flex: 5,
  },
  title: {
    fontSize: 22,
    ...Typography.primaryFont,
  },
  top: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: windowWidth,
  },
});

export default SequenceScreen;
