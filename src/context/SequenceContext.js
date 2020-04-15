import createDataContext from "./createDataContext";
import {
   db,
   formatSqlSeqCreate,
   formatSqlSeqDelete,
   formatSqlTaskInsert,
   formatSqlTaskDelete,
   formatSqlAllTaskSelect,
   formatSqlTaskSelect
} from '../api/sqlite';

const SequenceReducer = (state, action) => {
   switch (action.type) {
      case 'create_seq':
         console.log('seq created');
         console.log(action.payload);
         return state;
      case 'get_sequences':
         console.log([...state, ...action.payload.map(seq => seq.seq)])
         return [...state, ...action.payload.map(seq => {
            let seqName = seq.seq;
            if (!state.includes(seqName)) {
               return seqName;
            }
         })];
      case 'get_seq_data':
         console.log('get seq data');
         console.log(action.payload);
      default:
         return state;
   }
};

const createSeq = dispatch => {
   return async (seqName) => {
      const res = await db.transaction(function (tx) {
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

const createTask = dispatch => {
   return async (seqName, taskName, taskDuration, taskIndex) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskInsert(seqName, taskName, taskDuration, taskIndex),
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

const deleteSeq = dispatch => {
   return async (seqName) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSeqDelete(seqName),
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

const deleteTask = dispatch => {
   return async (seqName, taskName) => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlTaskDelete(seqName, taskName),
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

const getSeq = dispatch => {
   return async (seqName, taskName, taskDuration) => {
      const res =  await db.transaction(function (tx) {
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

export const { Context, Provider } = createDataContext(
   SequenceReducer,
   { createSeq, createTask, deleteSeq, deleteTask, getSeq },
   []
);
