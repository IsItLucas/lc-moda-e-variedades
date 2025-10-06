import { URL } from "../modules/fetch.js"
import { abrir_popup, fechar_popup, mostrar_mensagem } from "../modules/popup.js";


Object.assign(window, {
	abrir_popup,
	fechar_popup,
	login
});


const $ = (element) => document.getElementById(element);


export async function login() {
	const email = $("email").value;
	const senha = $("senha").value;

	try {
		const resposta = await fetch(`${URL}/usuarios/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, senha }),
			credentials: "include"
		});

		if (!resposta.ok) {
			if (resposta.status == 401) {
				throw new Error("E-mail ou senha incorretos.");
			}
			if (resposta.status == 403) {
				throw new Error("Usuário não confirmado. Verifique seu e-mail.");
			}
			if (resposta.status == 404) {
				throw new Error("Usuário não encontrado.");
			}

			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		mostrar_mensagem("Sucesso!", "Login concluído com sucesso!\nRedirecionando...");

		setTimeout(() => {
			window.location.href = "../gerenciamento/clientes.html";
		}, 1500);
	} catch(err) {
		mostrar_mensagem("Erro!", "Não foi possível efetuar o login!\n\n" + err);
	}
}