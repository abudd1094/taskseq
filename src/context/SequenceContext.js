import createDataContext from "./createDataContext";
import {
   db,
   formatSqlSeqCreate,
   formatSqlSeqDelete,
   formatSqlAllSeqSelect,
   formatSqlTaskInsert,
   formatSqlTaskDelete,
   formatSqlAllTaskSelect, formatSqlTaskUpdate, formatSqlSeqUpdate,
} from '../api/sqlite';

const SequenceReducer = (state, action) => {
   switch (action.type) {
      case 'create_seq':
         console.log('seq created');
         console.log(action.payload);
         return state;
      case 'update_seq':
         console.log('seq updated');
         console.log(action.payload);
         return state;
      case 'delete_seq':
         console.log('seq deleted');
         break;
      case 'get_all_seq':
         console.log('GET ALL SEQUENCES')
         console.log(action.payload)
         return action.payload;
      case 'get_seq_data':
         console.log('get seq data');
         return action.payload;
      case 'create_task':
         console.log('task created');
         console.log(action.payload);
         return state;
      case 'update_task':
         console.log('task updated');
         console.log(action.payload);
         return state;
      default:
         return;
   }
};

const createSeq = dispatch => {
   return async (seqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqCreate(seqName),
            [],
            function (tx, res) {
               dispatch({ type: 'create_seq', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

const updateSeq = dispatch => {
   return async (seqName, newValue) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqUpdate(seqName, newValue),
            [],
            function (tx, res) {
               dispatch({ type: 'update_seq', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

const deleteSeq = dispatch => {
   return async (seqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqDelete(seqName),
            [],
            function (tx, res) {
               dispatch({ type: 'delete_seq', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

const getAllSeq = dispatch => {
   return async () => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllSeqSelect(),
            [],
            function (tx, res) {
               const formattedRes = res.rows._array;
               dispatch({ type: 'get_all_seq', payload: formattedRes })
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };
};

const getSeq = dispatch => {
   return async (seqName) => {
      await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllTaskSelect(seqName),
            [],
            function (tx, res) {
               const formattedRes = res.rows._array;
               dispatch({ type: 'get_seq_data', payload: formattedRes })
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   };
};

const createTask = dispatch => {
   return async (seqName, taskName, taskDuration, taskIndex) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskInsert(seqName, taskName, taskDuration, taskIndex),
            [],
            function (tx, res) {
               dispatch({ type: 'create_task', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

const updateTask = dispatch => {
   return async (seqName, taskName, columnToChange, newValue) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskUpdate(seqName, taskName, columnToChange, newValue),
            [],
            function (tx, res) {
               dispatch({ type: 'update_task', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

const deleteTask = dispatch => {
   return async (seqName, taskName) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskDelete(seqName, taskName),
            [],
            function (tx, res) {
               dispatch({ type: 'delete_task', payload: res });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

export const { Context, Provider } = createDataContext(
   SequenceReducer,
   { createSeq, updateSeq, createTask, updateTask, deleteSeq, deleteTask, getSeq, getAllSeq },
   []
);
