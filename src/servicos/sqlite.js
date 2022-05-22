import * as SQLite from "expo-sqlite";

const abreConexao = () => {
    const database = SQLite.openDatabase('db.db');

    return database;
};

export const db = abreConexao();
