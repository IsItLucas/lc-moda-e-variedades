const __dirname = import.meta.dirname;


export function req_login(req, res, next) {
	if (!req.session.user) {
		return res.status(403).send("Acesso negado. Usuário não autenticado.");
	}
	next();
}


export function req_high_access(req, res, next) {
	if (!req.session.user) {
		return res.status(403).send("Acesso negado. Usuário não autenticado.");
	}

	const high_access = ["admin", "dev"];
	if (!high_access.includes(req.session.user.tipo)) {
		return res.status(403).send("Acesso negado. Permissão insuficiente.");
	}

	next();
}