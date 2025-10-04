import nodemailer from "nodemailer";
import crypto from "crypto";



export function gerar_token() {
	return crypto.randomBytes(32).toString("hex");
}


export async function enviar_email(destinatario, token) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "lucas.galonet.com@gmail.com",
			pass: process.env.EMAIL_PASS
		}
	});

	const url = `http://localhost:3000/usuarios/confirmar?token=${token}`;
	const html = `
        <div style="max-width:600px;margin:auto;padding:24px;background:#fff7fd;border-radius:12px;font-family:Montserrat,sans-serif;color:#222;">
            <div style="text-align:center;">
                <img src="https://raw.githubusercontent.com/IsItLucas/lc-moda-e-variedades/main/frontend/img/promo/logo.png" alt="Logo" style="width:180px;max-width:100%;margin-bottom:24px;filter:brightness(0.8);">
                <h1 style="color:#ff5c8d;font-size:2em;margin:0 0 16px 0;">Confirme seu e-mail</h1>
            </div>
            <hr style="border:none;border-top:2px solid #ff5c8d;margin:24px 0;">
            <p style="font-size:1.1em;margin-bottom:16px;">Ainda falta um passo para criar sua conta Luiza Carla Moda e Variedades.</p>
            <p style="margin-bottom:32px;">Clique no botão abaixo para confirmar seu e-mail:</p>
            <div style="text-align:center;margin-bottom:32px;">
                <a href="${url}" style="display:inline-block;padding:12px 32px;background:#ff5c8d;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:1.1em;">Confirmar e-mail</a>
            </div>
            <p style="font-size:0.95em;color:#544963;">Se você não solicitou este cadastro, ignore este e-mail.</p>
        </div>
    `;

	const opcoes_email = {
		from: "lucas.galonet.com@gmail.com",
		to: destinatario,
		subject: "Confirme seu e-mail | LC Moda e Variedades",
		html: html
	};

	await transporter.sendMail(opcoes_email);
}
