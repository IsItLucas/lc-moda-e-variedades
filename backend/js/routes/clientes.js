
import express from "express";
import * as db from "./database.js";

const router = express.Router();



// Rota para obter todos os clientes
router.get("/", async (req, res) => {
	const conexao = await db.conectar();
	const query = "SELECT * FROM clientes";
	const [clientes] = await conexao.execute(query);
	await db.desconectar(conexao);
	res.status(200).send(clientes);
});



// Rota para adicionar cliente
router.post("/adicionar", async (req, res) => {
	const cliente = req.body;
	const conexao = await db.conectar();
	const query = "INSERT INTO clientes(nome, telefone, email) VALUES (?, ?, ?)";
	const parametros = [cliente.nome, cliente.telefone, cliente.email];
	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
	res.status(201).send("Cliente adicionado com sucesso");
});



// Rota para editar cliente
router.post("/editar", async (req, res) => {
	const cliente = req.body;
	const conexao = await db.conectar();
	const query = "UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?";
	const parametros = [cliente.nome, cliente.telefone, cliente.email, cliente.id];
	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
	res.status(201).send("Cliente editado com sucesso");
});



// Rota para deletar cliente
router.delete("/deletar/:id", async (req, res) => {
	const id = req.params.id;
	const conexao = await db.conectar();
	const query = "DELETE FROM clientes WHERE id = ?";
	const parametros = [id];
	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
	res.status(201).send("Cliente excluído com sucesso");
});

export default router;