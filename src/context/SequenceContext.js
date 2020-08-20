import createDataContext from "./createDataContext";
import { db, formatSqlAllSeqSelect, formatSqlAllTaskSelect } from "../api/sqlite";
import { colorScheme1 } from "../styles/colors";

const seqReducer = (state, action) => {
   switch (action.type) {
     case "set_color_scheme":
       return { ...state, colorScheme: action.payload };
     case "set_current_seq":
       return { ...state, currentSeq: action.payload };
      case "set_current_task":
       return { ...state, currentTask: action.payload };
     case "set_current_tasks":
       return {
         ...state,
         currentTasks: action.payload,
         currentTask: action.payload[0],
         loading: false,
         timerOn: false,
       };
     case "set_loading":
       return { ...state, loading: action.payload };
     case "set_sequences":
       return {
         ...state,
         sequences: action.payload,
         loading: false,
         timerOn: false,
       };
     case "set_timer":
       return { ...state, timerOn: action.payload };
     case "set_master_timer":
       return { ...state, masterTimer: action.payload };
     default:
       return state;
   }
};

const loadSequences = dispatch => async sequences => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlAllSeqSelect(),
         [],
         function (tx, res) {
            const filteredResult = res.rows._array.filter(seq => seq.name !== "sqlite_sequence");
            dispatch({ type: 'set_sequences', payload: filteredResult });
         },
         (tx, err) => {
            console.log('error loading sequences:');
            console.log(err);
         }
      );
   });
};

const setCurrentSeq = dispatch => async currentSeq => {
   await dispatch({ type: 'set_current_seq', payload: currentSeq });
};

const setColorScheme = dispatch => async colorArray => {
   await dispatch({ type: 'set_color_scheme', payload: colorArray });
   console.log('COLOR SCHEME UPDATED')
};

const loadCurrentTasks = dispatch => async currentSeq => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlAllTaskSelect(currentSeq),
         [],
         function (tx, res) {
            const formattedRes = res.rows._array.sort((a, b) => a.TaskIndex - b.TaskIndex);
            dispatch({ type: 'set_current_tasks', payload: formattedRes });
         },
         (tx, err) => {
            console.log('error loading tasks:');
            console.log(err);
         }
      );
   });
};

const setCurrentTask = dispatch => currentTask => {
   dispatch({ type: 'set_current_task', payload: currentTask });
};

const setLoading = dispatch => seqLoading => {
   dispatch({ type: 'set_loading', payload: seqLoading });
};

const setTimer = dispatch => boolean => {
   dispatch({ type: 'set_timer', payload: boolean });
};

const setMasterTimer = (dispatch) => (time) => {
  dispatch({ type: "set_master_timer", payload: time });
};

export const { Provider, Context } = createDataContext(
   seqReducer,
   {
      setColorScheme,
      loadCurrentTasks,
      loadSequences,
      setCurrentSeq,
      setCurrentTask,
      setLoading,
      setTimer,
      setMasterTimer,
   },
   {
      colorScheme: colorScheme1,
      currentSeq: "",
      currentTask: "",
      currentTasks: [],
      loading: true,
      masterTimer: 0,
      sequences: [],
      timerOn: false,
   }
);
