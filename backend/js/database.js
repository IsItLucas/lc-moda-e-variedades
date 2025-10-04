import mysql from "mysql2/promise";

import * as crypt from "./crypt.js";


export async function conectar() {
	const conexao = await mysql.createConnection({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});

	return conexao;
}


export async function desconectar(conexao) {
	conexao.end();
}