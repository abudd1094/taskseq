import createDataContext from "./createDataContext";
import { db, formatSqlAllSeqSelect, formatSqlAllTaskSelect } from "../api/sqlite";

const seqReducer = (state, action) => {
   switch (action.type) {
      case 'set_current_seq':
         return { ...state, currentSeq: action.payload };
      case 'set_current_task':
         return { ...state, currentTask: action.payload };
      case 'set_current_tasks':
         return { ...state, currentTasks: action.payload, loading: false };
      case 'set_loading':
         return { ...state, loading: action.payload };
      case 'set_sequences':
         return { ...state, sequences: action.payload, loading: false };
      case 'set_timer':
         return { ...state, timerOn: action.payload };
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

export const { Provider, Context } = createDataContext(
   seqReducer,
   {
      loadCurrentTasks,
      loadSequences,
      setCurrentSeq,
      setCurrentTask,
      setLoading,
      setTimer
   },
   {
      currentSeq: '',
      currentTask: '',
      currentTasks: [],
      loading: true,
      sequences: [],
      timerOn: false,
   }
);
