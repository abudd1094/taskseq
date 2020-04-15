import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("TaskSeqDB.db");

// CREATE SEQUENCE TABLE
export const formatSqlSeqCreate = (seqName) => {
   return `CREATE TABLE ${seqName} (TaskName varchar(255), TaskDuration int, TaskIndex int)`;
};

// DROP SEQUENCE TABLE
export const formatSqlSeqDelete = (seqName) => {
   return `DROP TABLE ${seqName}`;
};

// CREATE TASK ROW
export const formatSqlTaskInsert = (seqName, taskName, taskDuration, taskIndex) => {
   return `INSERT INTO ${seqName} (TaskName, TaskDuration, TaskIndex) VALUES (${taskName}, ${taskDuration}, ${taskIndex})`
};

// DELETE TASK ROW
export const formatSqlTaskDelete = (seqName, taskName) => {
   return "DELETE FROM " + seqName + " WHERE TaskName=" + "'" + taskName.toString() + "'";
};

// RETURN ALL SEQ TASK ROWS
export const formatSqlAllTaskSelect = (seqName) => {
   return `SELECT * FROM ${seqName}`;
};

// RETURN SINGLE SEQ TASK ROW
export const formatSqlTaskSelect = (seqName, taskName) => {
   return "SELECT * FROM " + seqName + " WHERE TaskName=" + "'" + taskName.toString() + "'";
};
