import { db } from "./sqlite";

export const criaTabela = () => {
  db.transaction((transaction) => {
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS
        Notas
        (id INTEGER KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);
    `);
  });
};
