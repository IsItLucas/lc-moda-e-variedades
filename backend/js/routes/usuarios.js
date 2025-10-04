import express from "express";

import * as db from "./database.js";
import * as crypt from "./crypt.js";


const router = express.Router();


function autenticar(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.status(401).send("Faça login primeiro");
	}
}


router.post("/adicionar", async (req, res) => {
	const { nome, email, senha } = req.body;

	const conexao = await db.conectar();
	const query = "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)";
	const parametros = [
		nome,
		email,
		await crypt.criptografar(senha)
	];

	await conexao.execute(query, parametros);
	await db.desconectar(conexao);

	return res.status(201).send("Usuário cadastrado com sucesso");
});


router.delete("/deletar", async (req, res) => {
	const { email, senha } = req.body;

	const conexao = await db.conectar();
	const query_select = "SELECT * FROM usuarios WHERE email = ?";
	const [usuarios] = await conexao.execute(query_select, [email]);

	const usuario = usuarios[0];
	if (!usuario) {
		await db.desconectar(conexao);
		return res.status(404).send("Usuário não encontrado");
	}

	const senha_correta = await crypt.comparar(senha, usuario.senha);
	if (!senha_correta) {
		await db.desconectar(conexao);
		return res.status(401).send("Credenciais inválidas");
	}

	const query_delete = "DELETE FROM usuarios WHERE email = ?";
	await conexao.execute(query_delete, [email]);
	await db.desconectar(conexao);

	return res.status(200).send("Usuário deletado com sucesso");
});


router.get("/por-email/:email", async (req, res) => {
	const email = req.params.email;

	const conexao = await db.conectar();
	const query = "SELECT * FROM usuarios WHERE email = ?";
	const parametros = [email];
	const [resultado] = await conexao.execute(query, parametros);

	await db.desconectar(conexao);

	return res.status(200).send(resultado[0] || null);
});


router.get("/", async (req, res) => {
	const conexao = await db.conectar();
	const query = "SELECT * FROM usuarios";
	const [resultado] = await conexao.execute(query);

	await db.desconectar(conexao);

	return res.status(200).send(resultado);
});


export default router;