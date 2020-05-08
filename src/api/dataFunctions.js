import { db, formatSqlSeqDelete, formatSqlSeqUpdate, formatSqlTaskInsert, formatSqlTaskUpdate } from "./sqlite";

// SEQUENCE LEVEL //
export const updateSequence = async (currentSeq, newSeqName) => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlSeqUpdate(currentSeq, newSeqName),
         [],
         function (tx, res) {
            console.log('Seq Name Updated')
         },
         (tx, err) => {
            console.log('statement error');
            console.log(err);
         }
      );
   });
};

export const deleteSequence = async (seqName) => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlSeqDelete(seqName),
         [],
         function (tx, res) {
            console.log('SUCCESSFULLY DELETED')
         },
         (tx, err) => {
            console.log('statement error');
            console.log(err);
         }
      );
   });
};

// TASK LEVEL //
export const updateTask = async (currentSeq, taskID, columnToChange, newValue) => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlTaskUpdate(currentSeq, taskID, columnToChange, newValue),
         [],
         function (tx, res) {
            console.log('TASK UPDATED')
         },
         (tx, err) => {
            console.log('statement error');
            console.log(err);
         }
      );
   });
};

export const updateTasks = (currentSeq, tasks) => {
   tasks.map(task => {
      updateTask(currentSeq, task.TaskID.toString(), 'TaskName', task.TaskName );
      updateTask(currentSeq, task.TaskID.toString(), 'TaskDuration', task.TaskDuration );
      updateTask(currentSeq, task.TaskID.toString(), 'TaskIndex', task.TaskIndex );
   })
};

export const createTask = async (seq, taskName, taskDuration, taskIndex) => {
   await db.transaction(function (tx) {
      tx.executeSql(
         formatSqlTaskInsert(seq, taskName, taskDuration, taskIndex),
         [],
         function (tx, res) {
            console.log('SUCCESSFULLY CREATED')
         },
         (tx, err) => {
            console.log('statement error');
            console.log(err);
         }
      );
   });
};

export const createTasks = (seq, tasks) => {
   tasks.filter(task => task.new).map(task => createTask(seq, task.TaskName, task.TaskDuration.toString(), task.TaskIndex.toString()));
};
