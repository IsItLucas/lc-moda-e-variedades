window.addEventListener("DOMContentLoaded", on_load);


const $ = (element) => document.getElementById(element);


const body = document.getElementById("body");


function on_load() {
	const html = `
		<span class="popup-overlay" id="popup-overlay"></span>
		
		<span class="popup" id="popup-message">
			<div class="conteudo-popup">
				<h2 class="popup-title" id="popup-message-title">Título</h2>
				<br>
				<p class="popup-subtitle" id="popup-message-text">Mensagem</p>
				
				<div class="popup-botoes">
					<button type="button" class="primary" onclick="fechar_popup('popup-message')">OK</button>
				</div>
			</div>
		</span>

		<span class="popup" id="popup-question">
			<div class="conteudo-popup">
				<h2 class="popup-title" id="popup-question-title">Título</h2>
				<br>
				<p class="popup-subtitle" id="popup-question-text">Mensagem</p>
				
				<div class="popup-botoes">
					<button class="primary" id="botao-question-sim"><i class="fa-solid fa-circle-check"></i> Sim</button>
					<button class="secondary" id="botao-question-nao"><i class="fa-solid fa-xmark"></i> Não</button>
				</div>
			</div>
		</span>
	`

	body.insertAdjacentHTML("beforeend", html);
}


export function abrir_popup(popup_element_id) {
	const element = document.getElementById(popup_element_id);
	const overlay = document.getElementById("popup-overlay");

	element.classList.add("open");
	overlay.classList.add("open");

	body.classList.add("no-scroll");
}


export function fechar_popup(popup_element_id) {
	const element = document.getElementById(popup_element_id);
	const overlay = document.getElementById("popup-overlay");

	element.classList.remove("open");
	overlay.classList.remove("open");

	body.classList.remove("no-scroll");
}


export function mostrar_mensagem(titulo, texto) {
	const title_element = $("popup-message-title");
	const text_element = $("popup-message-text");

	title_element.innerText = titulo;
	text_element.innerText = texto;

	abrir_popup("popup-message");
}


export function perguntar(titulo, texto, callback_sim, callback_nao) {
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