import { db } from "./sqlite";

export const criaTabela = () => {
  db.transaction((transaction) => {
    transaction.executeSql(`
        CREATE TABLE IF NOT EXISTS
        Notas
        (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);
    `);
  });
};

export const adicionarNota = (nota) => {
  return new Promise((resolve, eject) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql(
          `
              INSERT INTO Notas (titulo, categoria, texto)
              VALUES (?, ?, ?);
          `,
          [nota.titulo, nota.categoria, nota.texto],
          () => resolve("Nota salva com sucesso!")
        );
      },
      (erro) => {
        eject(erro);
      }
    );
  });
};
