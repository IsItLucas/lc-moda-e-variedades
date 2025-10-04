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
            pass: "mrom cgcv ikxi rwrn"
        }
    });

    const url = `http://localhost:3000/usuarios/confirmar?token=${token}`;

    const opcoes_email = {
        from: 'lucas.galonet.com@gmail.com',
        to: destinatario,
        subject: 'Confirme seu cadastro',
        html: `<p>Clique no link para confirmar seu cadastro: <a href="${url}">${url}</a></p>`
    };

    await transporter.sendMail(opcoes_email);
}
