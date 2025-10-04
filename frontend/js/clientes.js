import { URL } from "../js/modules/fetch.js"
import { abrir_popup, fechar_popup } from "../js/modules/popup.js";


Object.assign(window, {
	abrir_popup,
	fechar_popup,
	alterar_pagina_clientes,
	botao_editar_clicado
});


window.addEventListener("DOMContentLoaded", on_load);


const $ = (element) => document.getElementById(element);


let clientes = [];


let tabela_clientes_pagina = 0;
let tabela_clientes_paginas = 0;


async function on_load() {
	await carregar_clientes();

	configurar_botoes();
	configurar_inputs_telefone();
}


async function carregar_clientes() {
	try {
		const resposta = await fetch(`${URL}/clientes/`)
		if (!resposta.ok) {
			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		};
		
		clientes = await resposta.json();
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível carregar clientes!\n\n" + err);
	}
	finally {
		ordenar_clientes("nome-az");
		listar_clientes();
	}
}


async function adicionar_cliente() {
	fechar_popup("popup-adicionar-cliente");

	const nome = $("nome-cliente-add").value;
	const telefone = $("telefone-cliente-add").value;
	const email = $("email-cliente-add").value;
	const cliente = {
		nome,
		telefone,
		email
	};

	try {
		const resposta = await fetch(`${URL}/clientes/adicionar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cliente)
		});

		if (!resposta.ok) {
			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		mostrar_mensagem("Sucesso!", "Cliente adicionado com sucesso!");
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível adicionar cliente!\n\n" + err);
	}
}


function botao_editar_clicado(element) {
	const id_cliente = element.dataset.id;
	const cliente = clientes.find(cliente => cliente.id == id_cliente);
	if (!cliente) {
		mostrar_mensagem("Erro!", "Erro ao encontrar cliente " + id_cliente);
		return;
	}

	const nome_element = $("nome-cliente-edit");
	const telefone_element = $("telefone-cliente-edit");
	const email_element = $("email-cliente-edit"); 
	const id_element = $("id-cliente-edit"); 

	nome_element.value = cliente.nome;
	telefone_element.value = cliente.telefone;
	email_element.value = cliente.email;
	id_element.value = cliente.id;

	abrir_popup("popup-editar-cliente");
}


async function editar_cliente() {
	fechar_popup("popup-editar-cliente");
	
	const nome = $("nome-cliente-edit").value;
	const telefone = $("telefone-cliente-edit").value;
	const email = $("email-cliente-edit").value;
	const id = $("id-cliente-edit").value;
	const cliente = {
		nome,
		telefone,
		email,
		id
	};

	try {
		const resposta = await fetch(`${URL}/clientes/editar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cliente)
		});

		if (!resposta.ok) {
			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		mostrar_mensagem("Sucesso!", "Alterações salvas com sucesso!");
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível editar cliente!\n\n" + err);
	}
}


async function excluir_cliente() {
	fechar_popup("popup-editar-cliente");
	fechar_popup("popup-question");

	const id = $("id-cliente-edit").value;

	try {
		const resposta = await fetch(`${URL}/clientes/deletar/${id}`, {
			method: "DELETE",
		});

		if (!resposta.ok) {
			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		mostrar_mensagem("Sucesso!", "Cliente excluído do banco de dados com sucesso!");
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível excluir cliente!\n\n" + err);
	}
}


function configurar_botoes() {
	const form_add = $("form-adicionar-cliente");
	form_add.addEventListener("submit", async function(event) {
		event.preventDefault();

		await adicionar_cliente();
		await carregar_clientes();
	});

	const form_edit = $("form-editar-cliente");
	form_edit.addEventListener("submit", async function(event) {
		event.preventDefault();

		await editar_cliente();
		await carregar_clientes();
	});

	const botao_excluir_cliente = $("botao-excluir-cliente");
	botao_excluir_cliente.addEventListener("click", function(event) {
		event.preventDefault();

		fechar_popup("popup-editar-cliente");

		const callback_sim = async () => {
			await excluir_cliente();
			await carregar_clientes();
		};

		const callback_nao = () => {
			fechar_popup("popup-question");
			abrir_popup("popup-editar-cliente");
		};

		perguntar(
			"Excluir Cliente?",
			"Você tem certeza que gostaria de excluir este cliente permanentemente?\nEsta ação não poderá ser desfeita.",
			callback_sim,
			callback_nao
		);
	});
}


function configurar_inputs_telefone() {
	const inputs = ["telefone-cliente-add", "telefone-cliente-edit"];

	for (const input of inputs) {
		const input_element = $(input)
		input_element.addEventListener("input", function(e) {
			let value = input_element.value;
			value = value.replace(/\D/g, "");

			if (value.length > 10) {
				value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
			} else if (value.length > 5) {
				value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
			} else if (value.length > 2) {
				value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
			} else if (value.length > 0) {
				value = value.replace(/^(\d{0,2})/, "($1");
			}

			input_element.value = value;
		});
	}
}


async function listar_clientes() {
	const container = $("tabela-clientes-body");
	if (clientes.length <= 0) {
		container.innerHTML = `<p>Nenhum cliente encontrado</p>`;
		return;
	}

	container.innerHTML = "<p>Carregando clientes...</p>";

	const texto_paginacao = $("texto-pagina-clientes");
	const texto_total = $("texto-total-clientes");

	const pesquisa = $("input-pesquisar-cliente").value;
	const linhas_por_pagina = parseInt($("linhas-clientes").value);
	const offset = (tabela_clientes_pagina * linhas_por_pagina);

	let html = "";

	tabela_clientes_paginas = Math.ceil(clientes.length / linhas_por_pagina);

	let i = 0;
	let qnt_linhas = 0;
	for (let cliente of clientes) {
		const cliente_search = (cliente.nome + cliente.telefone + cliente.email).toLowerCase();
		if (!cliente_search.includes(pesquisa.toLowerCase())) {
			continue;
		}

		i++;
		if (i < offset) {
			continue;
		}

		qnt_linhas += 1;
		if (qnt_linhas > linhas_por_pagina) {
			continue;
		}

		html += `
			<tr>
				<td><i class="fa-solid fa-pen editar-cliente" onclick='botao_editar_clicado(this)' data-id="${cliente.id}"></i> ${cliente.nome}</td>
				<td>${cliente.telefone}</td>
				<td>${cliente.email}</td>
				<td>11/08/2025</td>
				<td>R$ 1.000,00</td>
			</tr>`;
		
		let texto = (tabela_clientes_pagina + 1) + " / " + tabela_clientes_paginas;
		texto_paginacao.innerText = texto;

		let range_max_pagina = offset + linhas_por_pagina
		if (range_max_pagina > clientes.length) {
			range_max_pagina = clientes.length;
		}

		texto_total.innerText = (offset + 1) + " — " + range_max_pagina + " de " + (clientes.length) + " clientes";
	}
		
	container.innerHTML = html;
}


function alterar_pagina_clientes(step) {
	const sort = $("sort-clientes").value;
	ordenar_clientes(sort);

	listar_clientes();

	tabela_clientes_pagina += step;
	if (tabela_clientes_pagina < 0) {
		tabela_clientes_pagina = tabela_clientes_paginas - 1;
	}

	if (tabela_clientes_pagina >= tabela_clientes_paginas) {
		tabela_clientes_pagina = 0;
	}

	listar_clientes();
}


function ordenar_clientes(criterio) {
	return clientes.sort((a, b) => {
		switch (criterio) {
			case "nome-az":
				return a.nome.localeCompare(b.nome, "pt-BR");
			
			case "nome-za":
				return b.nome.localeCompare(a.nome, "pt-BR");

			case "email-az":
				return a.email.localeCompare(b.email, "pt-BR");

			case "email-za":
				return b.email.localeCompare(a.email, "pt-BR");

			case "valor-maior":
				return 0;

			case "valor-menor":
				return 0;

			case "compra-recente":
				return 0;

			case "compra-antiga":
				return 0;

			default:
				return 0;
		}
  });
}


function mostrar_mensagem(titulo, texto) {
	const title_element = $("popup-message-title");
	const text_element = $("popup-message-text");

	title_element.innerText = titulo;
	text_element.innerText = texto;

	abrir_popup("popup-message");
}


function perguntar(titulo, texto, callback_sim, callback_nao) {
	const title_element = $("popup-question-title");
	const text_element = $("popup-question-text");

	title_element.innerText = titulo;
	text_element.innerText = texto;

	let botao_sim = $("botao-question-sim");
	let botao_nao = $("botao-question-nao");

	const novo_sim = botao_sim.cloneNode(true);
	botao_sim.parentNode.replaceChild(novo_sim, botao_sim);
	botao_sim = novo_sim;

	const novo_nao = botao_nao.cloneNode(true);
	botao_nao.parentNode.replaceChild(novo_nao, botao_nao);
	botao_nao = novo_nao;

	botao_sim.addEventListener("click", (event) => {
		callback_sim();
	});
	botao_nao.addEventListener("click", (event) => {
		callback_nao();
	});

	abrir_popup("popup-question");
}