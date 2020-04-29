import {
   db,
   formatSqlAllSeqSelect,
   formatSqlAllTaskSelect,
   formatSqlSeqCreate,
   formatSqlSeqDelete,
   formatSqlSeqUpdate,
   formatSqlTaskDelete,
   formatSqlTaskInsert,
   formatSqlTaskUpdate,
} from './sqlite';

export const createSeq = dispatch => {
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

export const updateSeq = dispatch => {
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

export const getAllSeq = () => {
   return async () => {
      db.transaction(function (tx) {
         tx.executeSql(
            formatSqlAllSeqSelect(),
            [],
            function (tx, res) {
               return res.rows._array;
            },
            (tx, err) => {
               console.log('statement error');
               console.log(err);
            }
         );
      })
   }
};

export const getSeq = dispatch => {
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

export const createTask = dispatch => {
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

export const updateTask = dispatch => {
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

export const deleteTask = dispatch => {
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
