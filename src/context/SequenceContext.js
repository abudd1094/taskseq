import createDataContext from "./createDataContext";
import { db, formatSqlAllSeqSelect } from "../api/sqlite";

const seqReducer = (state, action) => {
   switch (action.type) {
      case 'set_current_seq':
         return { ...state, currentSeq: action.payload };
      case 'set_current_task':
         return { ...state, currentTask: action.payload };
      case 'set_current_tasks':
         return { ...state, currentTasks: action.payload };
      case 'set_loading':
         return { ...state, loading: action.payload };
      case 'set_sequences':
         return { ...state, sequences: action.payload, loading: false };
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

const setCurrentSeq = dispatch => currentSeq => {
   dispatch({ type: 'set_current_seq', payload: currentSeq });
};

const setCurrentTask = dispatch => currentTask => {
   dispatch({ type: 'set_current_task', payload: currentTask });
};

const setCurrentTasks = dispatch => currentTasks => {
   dispatch({ type: 'set_current_tasks', payload: currentTasks });
};

const setLoading = dispatch => seqLoading => {
   dispatch({ type: 'set_loading', payload: seqLoading });
};

export const { Provider, Context } = createDataContext(
   seqReducer,
   { loadSequences, setCurrentSeq, setCurrentTask, setCurrentTasks, setLoading },
   {
      currentSeq: '',
      currentTask: '',
      currentTasks: [],
      loading: true,
      sequences: [],
   }
);
