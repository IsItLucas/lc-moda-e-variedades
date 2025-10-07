import express from "express";
import cors from "cors";
import session from "express-session";

import dotenv from "dotenv";
dotenv.config({
	path: "backend/.env",
	encoding: "utf8",
	debug: true
});


import rotas_usuario from "./routes/usuarios.js";
import rotas_clientes from "./routes/clientes.js";


const app = express();


app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500", // ou o endereço do seu frontend
    credentials: true
}));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 * 7
	},
}));


app.use("/usuarios", rotas_usuario);
app.use("/clientes", rotas_clientes);

// app.use((req, res) => {
//   res.status(403).sendFile(path.join(__dirname, '../frontend/html/erros/unauthorized.html'));
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).sendFile(path.join(__dirname, '../frontend/html/erros/500.html'));
// });


app.get("/", (req, res) => {
	res.status(200).send("Running...");
});


const PORTA = process.env.PORT || 3000;
const IP = process.env.IP || "localhost";
app.listen(PORTA, () => {
	console.log(`O servidor está rodando em http://${IP}:${PORTA}...`);
});

