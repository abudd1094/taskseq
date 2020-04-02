import createDataContext from "./createDataContext";
import { db } from "../api/sqlite";

const SequenceReducer = (state, action) => {
   switch (action.type) {
      case 'get_sequences':
         console.log([...state, ...action.payload.map(seq => seq.seq)])
         return [...state, ...action.payload.map(seq => {
            let seqName = seq.seq;
            if (!state.includes(seqName)) {
               return seqName;
            }
         })];
      case 'create_sequence':
         return action.payload;
      default:
         return state;
   }
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

export const createSequence = dispatch => {
   return async (title, content, callback) => {
      const res =  await db.transaction(function (tx) {
         tx.executeSql(
            ``,
            [],
            function (tx, res) {
               const formattedRes = res.rows._array;
               console.log('seq created');
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
   { createSequence, getSequences },
   ["initialSeq"]
);
