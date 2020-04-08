import createDataContext from "./createDataContext";
import { db } from "../api/sqlite";
import {formatSqlInsert} from '../api/sqlite';

const SequenceReducer = (state, action) => {
   switch (action.type) {
      case 'create_sequence':
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
   return async () => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            `CREATE TABLE ${seqName} (TaskName varchar(255), TaskDuration int, TaskIndex, int)`,
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

const getSequences = dispatch => {
   return async () => {
      const res = await db.transaction(function (tx) {
         tx.executeSql(
            `SELECT DISTINCT seq FROM TaskTable`,
            [],
            function (tx, res) {
               const formattedRes = res.rows._array;
               dispatch({ type: 'get_sequences', payload: formattedRes });
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      });
   };
};

export const getSeqData = dispatch => {
   return async (seq, taskName, taskDuration) => {
      const res =  await db.transaction(function (tx) {
         tx.executeSql(
            formatSqlSelect(currentSeq),
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
   { getSequences },
   []
);
