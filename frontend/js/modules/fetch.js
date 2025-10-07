export const url = "http://127.0.0.1:3000"


export async function get_sessao() {
	try {
		const resposta = await fetch(`${url}/usuarios/sessao`, { credentials: "include" });
		if (!resposta.ok) {
			throw new Error(`${resposta.status} ${resposta.statusText}\n${resposta.url}`);
		}

		const dados = await resposta.json();
		return dados;
	} catch(err) {
		console.error("Não foi possível obter a sessão do usuário!\n\n" + err);
		return { logado: false };
	}
}