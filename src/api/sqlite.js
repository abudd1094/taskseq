import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("TaskSeqDB.db");

const formatSqlSelect = (seq) => {
   return "SELECT * FROM TaskTable WHERE seq=" + "'" + seq.toString() + "'";
};

const formatSqlInsert = (seq, taskName, taskDuration) => {
   return `INSERT INTO TaskTable (seq, taskName, taskDuration) VALUES(${seq}, ${taskName}, ${taskDuration})`;
};
