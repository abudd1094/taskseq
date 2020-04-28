import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("TaskSeqDB.db");

// CREATE SEQUENCE TABLE
export const formatSqlSeqCreate = (seqName) => {
   return `CREATE TABLE ${seqName} (TaskName varchar(255), TaskDuration int, TaskIndex int)`;
};

// UPDATE SEQUENCE TABLE
export const formatSqlSeqUpdate = (seqName, newValue) => {
   console.log("EXEC sp_rename '" + seqName + "', '" + newValue + "'")
   return "SELECT db_name()";

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
export const formatSqlTaskUpdate = (seqName, taskName, columnToChange, newValue) => {
   return "UPDATE " + seqName + " SET " + columnToChange + " = '" + newValue + "'" + " WHERE TaskName = " + "'" + taskName + "'"
};

// DELETE TASK ROW
export const formatSqlTaskDelete = (seqName, taskName) => {
   return "DELETE FROM " + seqName + " WHERE TaskName=" + "'" + taskName.toString() + "'";
};

// RETURN SINGLE SEQ TASK ROW
export const formatSqlTaskSelect = (seqName, taskName) => {
   return "SELECT * FROM " + seqName + " WHERE TaskName=" + "'" + taskName.toString() + "'";
};
