import { db, formatSqlSeqUpdate } from "./sqlite";

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
