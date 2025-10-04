window.addEventListener("DOMContentLoaded", on_load);


const body = document.getElementById("body");


function on_load() {
	const html = `<span class="popup-overlay" id="popup-overlay"></span>`
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