import * as db from "./database.js";
import * as crypt from "./crypt.js";


/* ======= FUNÇÕES DE USUÁRIOS ======= */

export async function cadastrar_usuario(nome, email, senha) {
	const conexao = await db.conectar();

	const query = "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)";
	const parametros = [
		nome,
		email,
		await crypt.criptografar(senha)
	];

	await conexao.execute(query, parametros);

	await db.desconectar(conexao);
}



export async function deletar_usuario(email, senha) {
	const conexao = await db.conectar();

	const query_select = "SELECT * FROM usuarios WHERE email = ?";
	const [usuarios] = await conexao.execute(query_select, [email]);
	const usuario = usuarios[0];

	if (!usuario) {
		await db.desconectar(conexao);
		throw new Error("Usuário não encontrado");
	}

	const senha_correta = await crypt.comparar(senha, usuario.senha);
	if (!senha_correta) {
		await db.desconectar(conexao);
		throw new Error("Credenciais inválidas");
	}

	const query_delete = "DELETE FROM usuarios WHERE email = ?";
	await conexao.execute(query_delete, [email]);

	await db.desconectar(conexao);
}


export async function obter_usuario_por_email(email) {
	const conexao = await db.conectar();

	const query = "SELECT * FROM usuarios WHERE email = ?"
	const parametros = [email];

	const [resultado] = await conexao.execute(query, parametros);

	await db.desconectar(conexao);

	return resultado[0];
}


export async function obter_usuarios() {
	const conexao = await db.conectar();

	const query = "SELECT * FROM usuarios";
	const [resultado] = await conexao.execute(query);

	await db.desconectar(conexao);

	return resultado;
}


/* ======= FUNÇÕES DE CLIENTES ======= */

export async function get_clientes() {
	const conexao = await db.conectar();

	const query = "SELECT * FROM clientes";
	const [clientes] = await conexao.execute(query);

	await db.desconectar(conexao);
	return clientes;
}


export async function adicionar_cliente(cliente) {
	const conexao = await db.conectar();

	const query = "INSERT INTO clientes(nome, telefone, email) VALUES (?, ?, ?)";
	const parametros = [cliente.nome, cliente.telefone, cliente.email];

	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
}


export async function editar_cliente(cliente) {
	const conexao = await db.conectar();

	const query = "UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?";
	const parametros = [cliente.nome, cliente.telefone, cliente.email, cliente.id];

	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
}


export async function deletar_cliente(id) {
	const conexao = await db.conectar();

	const query = "DELETE FROM clientes WHERE id = ?";
	const parametros = [id];

	await conexao.execute(query, parametros);
	await db.desconectar(conexao);
}