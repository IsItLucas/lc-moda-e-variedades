import { url } from "../modules/fetch.js"


window.addEventListener("DOMContentLoaded", on_load);


function on_load() {
	const html = `
		<footer>
			<div class="name">
				<img src="../../img/promo/logo.png" alt="Logo">
				<p>Luiza Carla Deodoro &copy; 2025</p>
			</div>
			<br><br><br><br>
			<div class="socials">
				<div class="social">
					<i class="fa-brands fa-whatsapp"></i><a href="https://wa.me/5531986039920">+55 (31) 98603-9920</a>
				</div>
				<span>&verbar;</span>
				<div class="social">
					<i class="fa-brands fa-instagram"></i><a href="https://www.instagram.com/l_c_moda_e_variedades/">@l_c_moda_e_variedades</a>
				</div>
			</div>
			<p>Rua Dr. Cristiano Resende, 2020 - Araguaia - BH</p>
		</footer>
	`;
	
	const body = document.getElementById("body");
	body.insertAdjacentHTML("beforeend", html);
}


export async function criar_nav_gerenciamento() {
	const html = `
		<nav>
			<div class="nav-button">
				<i class="fa-solid fa-chart-line"></i><a href="../html/painel.html">Painel</a><br>
			</div>
			<div class="nav-button">
				<i class="fa-solid fa-dolly"></i><a href="../html/produtos.html">Produtos</a><br>
			</div>
			<div class="nav-button active">
				<i class="fa-solid fa-user"></i><a href="../html/clientes.html">Clientes</a><br>
			</div>
			<div class="nav-button">
				<i class="fa-solid fa-bag-shopping"></i><a href="../html/vendas.html">Vendas</a><br>
			</div>
		</nav>
	`;

	const body = document.getElementById("body");
	body.insertAdjacentHTML("beforeend", html);

	const resposta = await fetch(`${url}/usuarios/sessao`, { credentials: "include" });
	const dados = await resposta.json();
	
	if (!dados.logado) {
		return;
	}
}