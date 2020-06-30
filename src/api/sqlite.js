import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("TaskSequencerDB.db");

// CREATE SEQUENCE TABLE
export const formatSqlSeqCreate = (seqName) => {
   return `CREATE TABLE ${seqName.toString()} (TaskID INTEGER PRIMARY KEY AUTOINCREMENT, TaskName varchar(255), TaskDuration int, TaskIndex int, Completions int)`;
};

// UPDATE SEQUENCE TABLE
export const formatSqlSeqUpdate = (seqName, newValue) => {
   return `ALTER TABLE ${seqName} RENAME TO ${newValue}`;
};

// DROP SEQUENCE TABLE
export const formatSqlSeqDelete = (seqName) => {
   return `DROP TABLE ${seqName}`;
};

// LOAD ALL SEQUENCES
export const formatSqlAllSeqSelect = () => {
   return `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`;
};

// RETURN ALL SEQ TASK ROWS
export const formatSqlAllTaskSelect = (seqName) => {
   return `SELECT * FROM ${seqName}`;
};

// CREATE TASK ROW
export const formatSqlTaskInsert = (seqName, taskName, taskDuration, taskIndex) => {
   return "INSERT INTO " + seqName + " (TaskName, TaskDuration, TaskIndex) VALUES (" + "'" + taskName + "', '" + taskDuration + "', '" + taskIndex + "')"
};

// UPDATE TASK ROW
export const formatSqlTaskUpdate = (seqName, taskID, columnToChange, newValue) => {
   return "UPDATE " + seqName + " SET " + columnToChange + " = '" + newValue + "'" + " WHERE TaskID = " + "'" + taskID + "'"
};

// DELETE TASK ROW
export const formatSqlTaskDelete = (seqName, taskID) => {
   return "DELETE FROM " + seqName + " WHERE TaskID=" + "'" + taskID.toString() + "'";
};

// RETURN SINGLE SEQ TASK ROW
export const formatSqlTaskSelect = (seqName, taskName) => {
   return "SELECT * FROM " + seqName + " WHERE TaskName=" + "'" + taskName.toString() + "'";
};
