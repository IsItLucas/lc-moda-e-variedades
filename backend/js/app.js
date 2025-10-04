import express from "express";
import cors from "cors";
import session from "express-session";

import dotenv from "dotenv";
dotenv.config({
	path: "backend/.env",
	encoding: "utf8",
	debug: true
});


import * as index from "./index.js";
import * as crypt from "./crypt.js";


const app = express();


app.use(cors());
app.use(express.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 12
	}
}));


function autenticar(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.status(401).send("Faça login primeiro");
	}
}


app.get("/", (req, res) => {
	res.status(200).send("Running...");
});


/* ======= ROTAS DE LOGIN ======= */

app.get("/dashboard", autenticar, (req, res) => {
	const usuario = req.session.user.nome;
	return res.status(200).send(`Bem-vindo, ${usuario}`);
});


app.get("/usuarios", autenticar, async (req, res) => {
	const usuarios = await index.obter_usuarios();
	return res.status(200).send(usuarios);
});


app.get("/usuarios/desconectar", autenticar, (req, res) => {
	req.session.destroy();
	return res.status(200).send("Sessão encerrada com sucesso");
});


app.post("/usuarios/adicionar", async (req, res) => {
	const { nome, email, senha } = req.body;
	if (await index.obter_usuario_por_email(email)) {
		return res.status(409).send("Este e-mail já está em uso");
	}

	const caracteres_proibidos = "/(<|>)\\+-*=!:;${}()[]".split("");
	if (nome.split("").some(char => caracteres_proibidos.includes(char))) {
		return res.status(403).send("Caracteres proibidos detectados no nome de usuário");
	}

	await index.cadastrar_usuario(nome, email, senha);

	return res.status(201).send("Usuário cadastrado com sucesso");
});


app.post("/usuarios/conectar", async (req, res) => {
	try {
		if (req.session.user) {
			return res.status(409).send(`Já logado como: ${req.session.user.nome}`);
		}

		const { email, senha } = req.body;

		const usuario = await index.obter_usuario_por_email(email);
		if (!usuario) {
			return res.status(404).send("Usuário não encontrado");
		}

		const senha_correta = await crypt.comparar(senha, usuario.senha);
		if (!senha_correta) {
			return res.status(401).send("Credenciais inválidas");
		}

		req.session.user = { 
			nome: usuario.nome,
			tipo: usuario.tipo
		};
		return res.status(200).send("Login realizado com sucesso: " + usuario.nome + " (" + usuario.tipo + ")");
	}
	catch(err) {
		return res.status(500).send(err.message);
	}
});


app.delete("/usuarios/deletar", async (req, res) => {
	try {
		const { email, senha } = req.body;

		const usuario = await index.obter_usuario_por_email(email);
		if (!usuario) {
			return res.status(404).send("Usuário não encontrado");
		}


		const senha_correta = await crypt.comparar(senha, usuario.senha);
		if (!senha_correta) {
			return res.status(401).send("Credenciais inválidas");
		}

		await index.deletar_usuario(email, senha);

		req.session.destroy();
		return res.status(200).send("Usuário deletado com sucesso");
	}
	catch (err) {
		return res.status(500).send(err.message);
	}
});


/* ======= ROTAS DE CLIENTES ======= */

app.get("/clientes", async (req, res) => {
	try {
		const clientes = await index.get_clientes();
		return res.status(200).send(clientes);
	} catch(err) {
		return res.status(500).send("Erro:\n" + JSON.stringify(err));
	}
});


app.post("/clientes/adicionar", async (req, res) => {
	try {
		const keys = ["nome", "telefone", "email"];
		for (const key of keys) {
			if (key in req.body) continue;

			const err_message = `Não encontrado chave '${key}' em Object '${JSON.stringify(req.body)}'`;
			return res.status(400).send(err_message);
		}

		await index.adicionar_cliente(req.body);

		return res.status(201).send("Cliente adicionado com sucesso");
	} catch (err) {
		return res.status(500).send("Erro:\n" + JSON.stringify(err));
	}
});


app.post("/clientes/editar", async (req, res) => {
	try {
		const keys = ["id", "nome", "telefone", "email"];
		for (const key of keys) {
			if (key in req.body) continue;

			const err_message = `Não encontrado chave '${key}' em Object '${JSON.stringify(req.body)}'`;
			return res.status(400).send(err_message);
		}

		await index.editar_cliente(req.body);

		return res.status(201).send("Cliente editado com sucesso");
	} catch (err) {
		return res.status(500).send("Erro:\n" + JSON.stringify(err));
	}
});


app.delete("/clientes/deletar/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await index.deletar_cliente(id);
		return res.status(201).send("Cliente excluído com sucesso");
	} catch (err) {
		return res.status(500).send("Erro:\n" + JSON.stringify(err));
	}
});


const PORTA = process.env.PORT || 3000;
const IP = process.env.IP || "localhost";
app.listen(PORTA, () => {
	console.log(`O servidor está rodando em http://${IP}:${PORTA}...`);
});

