window.addEventListener("DOMContentLoaded", on_load);


function on_load() {
	const html = `
		<footer>
			<div class="name">
				<img src="../img/promo/logo.png" alt="Logo">
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