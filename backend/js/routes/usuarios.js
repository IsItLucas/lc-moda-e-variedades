import express from "express";


import * as db from "../db.js";
import * as crypt from "../modules/crypt.js";
import { gerar_token, enviar_email } from "../modules/email.js";
import session from "express-session";


const router = express.Router();


function autenticar(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.status(401).send("Usuário não autenticado. Faça login primeiro.");
	}
}


router.get("/dashboard", autenticar, (req, res) => {
	const usuario = req.session.user.nome;
	res.status(200).send(`Bem-vindo, ${usuario}!`);
});


router.get("/sessao", (req, res) => {
	if (req.session.user) {
		return res.status(200).json({ logado: true, usuario: req.session.user });
	}

	return res.status(200).json({ logado: false });
});


router.get("/", async (req, res) => {
	const conexao = await db.conectar();
	const query = "SELECT * FROM usuarios";
	const [resultado] = await conexao.execute(query);

	await db.desconectar(conexao);

	return res.status(200).send(resultado);
});


router.get("/email/:email", async (req, res) => {
	const usuario = obter_usuario_por_email(req.params.email, true);

	if (!usuario) {
		return res.status(404).send("Usuário não encontrado");
	}

	return res.status(200).send(usuario);
});


router.get("/confirmar", async (req, res) => {
	const { token } = req.query;
	if (!token) {
		return res.status(400).send("Token não informado.");
	}

	const conexao = await db.conectar();
	const query_select = "SELECT * FROM usuarios WHERE token_confirmacao = ?";
	const [usuarios] = await conexao.execute(query_select, [token]);
	const usuario = usuarios[0];

	if (!usuario) {
		await db.desconectar(conexao);
		return res.status(404).send("Token inválido ou usuário não encontrado.");
	}

	if (usuario.confirmado) {
		await db.desconectar(conexao);
		return res.status(200).send("Usuário já confirmado.");
	}

	const query_update = "UPDATE usuarios SET confirmado = 1, token_confirmacao = NULL WHERE token_confirmacao = ?";
	await conexao.execute(query_update, [token]);
	await db.desconectar(conexao);

	return res.status(200).send("E-mail confirmado com sucesso!");
});


router.get("/logout", (req, res) => {
	if (!req.session.user) {
		return res.status(409).send("Nenhum usuário logado.");
	}

	req.session.destroy();
	res.status(200).send("Sessão encerrada com sucesso.");
});


router.post("/login", async (req, res) => {
	if (req.session.user) {
		return res.status(409).send(`Já logado como: ${req.session.user.nome}. Faça logout primeiro!`);
	}

	const { email, senha } = req.body;

	const usuario = await obter_usuario_por_email(email, false);
	if (!usuario) {
		return res.status(404).send("Usuário não encontrado.");
	}

	if (usuario.confirmado == false) {
		return res.status(403).send("Usuário não confirmado. Verifique seu email.");
	}

	const senha_correta = await crypt.comparar(senha, usuario.senha);
	if (!senha_correta) {
		return res.status(401).send("Credenciais inválidas.");
	}

	req.session.user = {
		id: usuario.id,
		nome: usuario.nome,
		email: usuario.email,
		tipo: usuario.tipo
	};
	req.session.save();

	return res.status(200).send("Login realizado com sucesso: " + usuario.nome + " (" + usuario.tipo + ")");
});


router.post("/cadastrar", async (req, res) => {
	const { nome, email, senha } = req.body;

	const emailRegex = /^[\w.-]+@(?:gmail|outlook|hotmail|yahoo|icloud|bol|uol|terra|live|msn|aol|zoho|protonmail|yandex)\.(com|com\.br|net|org|br)$/i;
	if (!emailRegex.test(email)) {
		return res.status(400).send("E-mail inválido ou provedor não suportado. Use um e-mail dos principais provedores.");
	}

	if (await obter_usuario_por_email(email, false)) {
		return res.status(409).send("E-mail já cadastrado. Tente outro.");
	}

	const conexao = await db.conectar();
	const query = "INSERT INTO usuarios(nome, email, senha, token_confirmacao, confirmado) VALUES (?, ?, ?, ?, FALSE)";
	const token = gerar_token();
	const parametros = [
		nome,
		email,
		await crypt.criptografar(senha),
		token
	];

	await conexao.execute(query, parametros);
	await db.desconectar(conexao);

	await enviar_email(email, token, nome);

	return res.status(201).send("Usuário cadastrado com sucesso! Confirme seu e-mail para continuar.");
});


router.delete("/deletar", async (req, res) => {
	const { email, senha } = req.body;

	const conexao = await db.conectar();
	const query_select = "SELECT * FROM usuarios WHERE email = ?";
	const [usuarios] = await conexao.execute(query_select, [email]);

	const usuario = usuarios[0];
	if (!usuario) {
		await db.desconectar(conexao);
		return res.status(404).send("Usuário não encontrado.");
	}

	const senha_correta = await crypt.comparar(senha, usuario.senha);
	if (!senha_correta) {
		await db.desconectar(conexao);
		return res.status(401).send("Credenciais inválidas.");
	}

	const query_delete = "DELETE FROM usuarios WHERE email = ?";
	await conexao.execute(query_delete, [email]);
	await db.desconectar(conexao);

	req.session.destroy();

	return res.status(200).send("Usuário deletado com sucesso.");
});


async function obter_usuario_por_email(email, confirmado) {
	const conexao = await db.conectar();

	let query = "SELECT * FROM usuarios WHERE email = ? AND confirmado = TRUE";
	if (!confirmado) {
		query = "SELECT * FROM usuarios WHERE email = ?";
	}

	const parametros = [email];
	const [resultado] = await conexao.execute(query, parametros);

	await db.desconectar(conexao);

	return resultado[0] || null;
}


export default router;