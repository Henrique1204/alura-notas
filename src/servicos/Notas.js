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

export const atualizarNota = (nota) => {
  return new Promise((resolve, eject) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql(
          `
            UPDATE Notas SET titulo = ?, categoria = ?, texto = ?
            WHERE id = ?;
          `,
          [nota.titulo, nota.categoria, nota.texto, nota.id],
          () => resolve("Nota editada com sucesso!")
        );
      },
      (erro) => {
        eject(erro);
      }
    );
  });
};

export const deletarNota = (id) => {
  return new Promise((resolve, eject) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql("DELETE FROM Notas WHERE id = ?;",
          [id],
          () => resolve("Nota removida com sucesso!")
        );
      },
      (erro) => {
        eject(erro);
      }
    );
  });
};

export const buscarNotas = () => {
  return new Promise((resolve, eject) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql("SELECT * FROM Notas;", [], (_, resolves) =>
          resolve(resolves.rows._array)
        );
      },
      (erro) => {
        eject(erro);
      }
    );
  });
};
