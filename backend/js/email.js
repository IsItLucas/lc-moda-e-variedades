import nodemailer from "nodemailer";
import crypto from "crypto";

// Função para gerar token de confirmação
export function gerarTokenConfirmacao() {
    return crypto.randomBytes(32).toString("hex");
}

// Função para enviar e-mail de confirmação
export async function enviarEmailConfirmacao(destinatario, token) {
    // Configure o transporter com seu serviço de e-mail
    const transporter = nodemailer.createTransport({
        service: "gmail", // ou outro serviço
        auth: {
            user: "SEU_EMAIL@gmail.com",
            pass: "SUA_SENHA_DE_APP"
        }
    });

    const urlConfirmacao = `http://localhost:3000/confirmar?token=${token}`;

    const mailOptions = {
        from: 'SEU_EMAIL@gmail.com',
        to: destinatario,
        subject: 'Confirme seu cadastro',
        html: `<p>Clique no link para confirmar seu cadastro: <a href="${urlConfirmacao}">${urlConfirmacao}</a></p>`
    };

    await transporter.sendMail(mailOptions);
}
