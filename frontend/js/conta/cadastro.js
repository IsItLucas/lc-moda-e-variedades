import { url } from "../modules/fetch.js"
import { abrir_popup, fechar_popup, mostrar_mensagem } from "../modules/popup.js";


Object.assign(window, {
	abrir_popup,
	fechar_popup,
	cadastrar
});


window.addEventListener("DOMContentLoaded", on_load);


const $ = (element) => document.getElementById(element);


const botao = $("botao-cadastrar");


function on_load() {
	botao.disabled = false;
	botao.innerText = "Cadastrar";
}


export async function cadastrar(event) {
	if (event) event.preventDefault();

	botao.disabled = true;
	botao.innerText = "Cadastrando...";

	const nome = $("nome").value;
	const email = $("email").value;
	const senha = $("senha").value;
	const confirmar_senha = $("confirmar-senha").value;

	try {
		if (senha !== confirmar_senha) {
			throw new Error("As senhas não coincidem.");
		}

		const resposta = await fetch(`${url}/usuarios/cadastrar`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ nome, email, senha }),
			credentials: "include"
		});

		if (!resposta.ok) {
			if (resposta.status == 400) {
				throw new Error("E-mail inválido ou provedor não suportado. Use um e-mail dos principais provedores.");
			}

			if (resposta.status == 409) {
				throw new Error("E-mail já cadastrado. Tente outro.");
			}

			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		mostrar_mensagem("Sucesso!", "Cadastro concluído com sucesso!\nVefique seu e-mail para continuar.");

		setTimeout(() => {
			window.location.href = "../login/login.html";
		}, 3000);
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível efetuar o login!\n\n" + err);
	} finally {
		botao.disabled = false;
		botao.innerText = "Cadastrar";
	}
}