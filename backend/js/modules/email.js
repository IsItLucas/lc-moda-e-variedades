import nodemailer from "nodemailer";
import crypto from "crypto";



export function gerar_token() {
	return crypto.randomBytes(32).toString("hex");
}


export async function enviar_email(destinatario, token, nome_cliente) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "lucas.galonet.com@gmail.com",
			pass: process.env.EMAIL_PASS
		}
	});

	const url = `http://localhost:3000/usuarios/confirmar?token=${token}`;
	const html = `
		<!DOCTYPE html>
			<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

			<head>
			<meta charset="UTF-8" />
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<!--[if !mso]><!-- -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<!--<![endif]-->
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
			<meta name="x-apple-disable-message-reformatting" />
			<link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,400;1,400;0,700" rel="stylesheet" />
			<link href="https://fonts.googleapis.com/css?family=Nunito+Sans:ital,wght@" rel="stylesheet" />
			<title>Untitled</title>
			<!-- Made with Postcards Email Builder by Designmodo -->
			<style>
			html, body { margin: 0 !important; padding: 0 !important; min-height: 100% !important; width: 100% !important; -webkit-font-smoothing: antialiased; }
					* { -ms-text-size-adjust: 100%; }
					#outlook a { padding: 0; }
					.ReadMsgBody, .ExternalClass { width: 100%; }
					.ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height: 100%; }
					table, td, th { mso-table-lspace: 0 !important; mso-table-rspace: 0 !important; border-collapse: collapse; }
					u + .body table, u + .body td, u + .body th { will-change: transform; }
					body, td, th, p, div, li, a, span { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule: exactly; }
					img { border: 0; outline: 0; line-height: 100%; text-decoration: none; -ms-interpolation-mode: bicubic; }
					a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
					.body .pc-project-body { background-color: transparent !important; }
							@media screen and (-webkit-min-device-pixel-ratio:0) { .pc-img-h-pct { height: auto !important; } }
			
					@media (min-width: 621px) {
						.pc-lg-hide {  display: none; } 
						.pc-lg-bg-img-hide { background-image: none !important; }
					}
			</style>
			<style>
			@media (max-width: 620px) {
			.pc-project-body {min-width: 0px !important;}
			.pc-project-container, .pc-component {width: 100% !important;}
			.pc-sm-hide {display: none !important;}
			.pc-sm-bg-img-hide {background-image: none !important;}
			.pc-w620-padding-0-0-0-0 {padding: 0px 0px 0px 0px !important;}
			.pc-w620-font-size-58px {font-size: 58px !important;}
			.pc-w620-itemsVSpacings-0 {padding-top: 0px !important;padding-bottom: 0px !important;}
			.pc-w620-itemsHSpacings-0 {padding-left: 0px !important;padding-right: 0px !important;}
			
			.pc-w620-width-hug {width: auto !important;}
			.pc-w620-width-fill {width: 100% !important;}
			table.pc-w620-spacing-0-30-0-0 {margin: 0px 30px 0px 0px !important;}
			td.pc-w620-spacing-0-30-0-0,th.pc-w620-spacing-0-30-0-0{margin: 0 !important;padding: 0px 30px 0px 0px !important;}
			.pc-w620-padding-60-20-10-20 {padding: 60px 20px 10px 20px !important;}
			table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
			td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
			.pc-g-ib{display: inline-block !important;}
			.pc-g-b{display: block !important;}
			.pc-g-rb{display: block !important;width: auto !important;}
			.pc-g-wf{width: 100% !important;}
			.pc-g-rpt{padding-top: 0 !important;}
			.pc-g-rpr{padding-right: 0 !important;}
			.pc-g-rpb{padding-bottom: 0 !important;}
			.pc-g-rpl{padding-left: 0 !important;}
			}
			</style>
			<!--[if !mso]><!-- -->
			<style>
			@font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w3aXw.woff') format('woff'), url('https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w3aXo.woff2') format('woff2'); } @font-face { font-family: 'Montserrat'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw3aXw.woff') format('woff'), url('https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw3aXo.woff2') format('woff2'); } @font-face { font-family: 'Montserrat'; font-style: italic; font-weight: 400; src: url('https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9WXZ0oA.woff') format('woff'), url('https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9WXZ0pg.woff2') format('woff2'); }
			</style>
			<!--<![endif]-->
			<!--[if mso]>
				<style type="text/css">
					.pc-font-alt {
						font-family: Arial, Helvetica, sans-serif !important;
					}
				</style>
				<![endif]-->
			<!--[if gte mso 9]>
				<xml>
					<o:OfficeDocumentSettings>
						<o:AllowPNG/>
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
				<![endif]-->
			</head>

			<body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; font-weight: normal; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #ffffff;" bgcolor="#ffffff">
			<table class="pc-project-body" style="table-layout: fixed; width: 100%; min-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0" role="presentation">
			<tr>
			<td align="center" valign="top" style="width:auto;">
				<table class="pc-project-container" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
				<tr>
				<td class="pc-w620-padding-0-0-0-0" style="padding: 20px 0px 20px 0px;" align="left" valign="top">
				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
					<tr>
					<td valign="top">
					<!-- BEGIN MODULE: Personal Letter -->
					<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" align="center" class="pc-component" style="width: 600px; max-width: 600px;">
					<tr>
						<td class="pc-w620-spacing-0-0-0-0" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
						<table style="border-collapse: separate; border-spacing: 0px;" align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
						<tr>
						<td valign="top" class="pc-w620-padding-60-20-10-20" style="padding: 20px 40px 20px 40px; height: unset; background-color: transparent;" bgcolor="transparent">
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td align="center" valign="top">
							<a class="pc-font-alt" href="https://postcards.email/" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: top;">
								<img src="https://raw.githubusercontent.com/IsItLucas/lc-moda-e-variedades/refs/heads/master/frontend/img/promo/logo_black.png" width="320" height="121" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 320px; height: auto; max-width: 100%; border: 0;" />
							</a>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td valign="top" style="padding: 40px 0px 40px 0px;">
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin: auto;">
								<tr>
								<td valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cccccc;">&nbsp;</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td align="center" valign="top" style="padding: 0px 0px 40px 0px; height: auto;">
							<table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
								<tr>
								<td valign="top" align="center">
								<div class="pc-font-alt" style="text-decoration: none;">
								<div class="pc-w620-font-size-58px" style="font-size:62px;line-height:107%;text-align:center;text-align-last:center;color:#222222;font-family:'Montserrat', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;">
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 62px; line-height: 107%; font-weight: 400;" class="pc-w620-font-size-58px">Confirme seu</span>
									</div>
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 62px; line-height: 107%; font-weight: 400;">e-mail</span>
									</div>
								</div>
								</div>
								</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td align="center" valign="top">
							<table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
								<tr>
								<td valign="top" align="center">
								<div class="pc-font-alt" style="text-decoration: none;">
								<div style="font-size:16px;line-height:160%;text-align:center;text-align-last:center;color:#222222;font-family:'Montserrat', Arial, Helvetica, sans-serif;letter-spacing:0px;font-style:normal;">
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 400;">Olá, </span><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 700;">${nome_cliente}</span><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 400;">!</span>
									</div>
									<div>
									<br>
									</div>
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 400;">Ainda falta um passo para criar a sua conta </span><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 700;">Luiza Carla Moda e Variedades</span><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 400;">.</span>
									</div>
									<div>
									<br>
									</div>
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 160%; font-weight: 400;">Clique no botão abaixo para confirmar seu e-mail:</span>
									</div>
									<div>
									<br>
									</div>
								</div>
								</div>
								</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width: 100%;">
							<tr>
							<th valign="top" align="center" style="text-align: center; font-weight: normal;">
							<!--[if mso]>
					<table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
						<tr>
							<td valign="middle" align="center" style="border-radius: 8px; background-color: #ff5c8d; text-align:center; color: #ffffff; padding: 14px 19px 14px 19px; mso-padding-left-alt: 0; margin-left:19px;" bgcolor="#ff5c8d">
												<a class="pc-font-alt" style="display: inline-block; text-decoration: none; text-align: center;" href="${url}" target="_blank"><span style="font-size:16px;line-height:24px;color:#ffffff;font-family:'Montserrat', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;display:inline-block;vertical-align:top;"><span style="font-family:'Montserrat', Arial, Helvetica, sans-serif;display:inline-block;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; font-weight: 700;">Confirmar e-mail</span></span></span></a>
											</td>
						</tr>
					</table>
					<![endif]-->
							<!--[if !mso]><!-- -->
							<a style="display: inline-block; box-sizing: border-box; border-radius: 8px; background-color: #ff5c8d; padding: 14px 19px 14px 19px; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="${url}" target="_blank"><span style="font-size:16px;line-height:24px;color:#ffffff;font-family:'Montserrat', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;display:inline-block;vertical-align:top;"><span style="font-family:'Montserrat', Arial, Helvetica, sans-serif;display:inline-block;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; font-weight: 700;">Confirmar e-mail</span></span></span></a>
							<!--<![endif]-->
							</th>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td valign="top" style="padding: 40px 0px 40px 0px;">
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin: auto;">
								<tr>
								<td valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #cccccc;">&nbsp;</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td align="left" style="padding: 0px 0px 30px 0px;">
							<table class="pc-w620-width-hug" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
								<tr>
								<td style="width:unset;" valign="top">
								<table class="pc-width-hug pc-w620-width-hug" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
								<tbody>
									<tr>
									<td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-0" valign="middle" style="padding-top: 0px; padding-bottom: 0px;">
									<table class="pc-w620-width-fill" style="width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tr>
										<td align="left" valign="middle">
										<a class="pc-font-alt" href="https://wa.me/5531986039920" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: top;">
										<img src="https://cloudfilesdm.com/postcards/0358e4f6adaf3be3599bf43245043de2.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20px; height: 20px;" alt="" />
										</a>
										</td>
									</tr>
									</table>
									</td>
									<td class="pc-w620-itemsHSpacings-0" valign="middle" style="padding-right: 15px; padding-left: 15px;" />
									<td class="pc-g-rpt pc-g-rpb pc-w620-itemsVSpacings-0" valign="middle" style="padding-top: 0px; padding-bottom: 0px;">
									<table class="pc-w620-width-fill" style="width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tr>
										<td align="left" valign="middle">
										<a class="pc-font-alt" href="https://www.instagram.com/l_c_moda_e_variedades/" target="_blank" style="text-decoration: none; display: inline-block; vertical-align: top;">
										<img src="https://cloudfilesdm.com/postcards/b2c41879b18e15bbf48a7181ec863608.png" class="" width="20" height="20" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20px; height: 20px;" alt="" />
										</a>
										</td>
									</tr>
									</table>
									</td>
									</tr>
								</tbody>
								</table>
								</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
							<tr>
							<td align="left" valign="top" style="padding: 0px 0px 20px 0px; height: auto;">
							<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
								<tr>
								<td valign="top" align="left">
								<div class="pc-font-alt" style="text-decoration: none;">
								<div style="font-size:14px;line-height:20px;text-align:left;text-align-last:left;color:#222222;font-family:'Montserrat', Arial, Helvetica, sans-serif;letter-spacing:-0.2px;font-style:normal;">
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; font-weight: 400;">Luiza Carla Deodoro</span>
									</div>
									<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; font-weight: 400;">Rua Dr. Cristiano Resende, 2020 - Araguaia - BH</span>
									</div>
								</div>
								</div>
								</td>
								</tr>
							</table>
							</td>
							</tr>
							</table>
							<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
							<tr>
							<td valign="top" align="left">
							<div class="pc-font-alt" style="text-decoration: none;">
								<div style="font-size:14px;line-height:16px;text-align:left;text-align-last:left;color:#22222280;font-family:'Montserrat', Arial, Helvetica, sans-serif;font-style:italic;letter-spacing:-0.2px;">
								<div style="font-family:'Montserrat', Arial, Helvetica, sans-serif;"><span style="font-family: 'Montserrat', Arial, Helvetica, sans-serif; font-weight: 400; font-size: 14px; line-height: 16px;">Esta é uma mensagem automática. Por favor, não responda a este e-mail, pois ele não é monitorado.</span>
								</div>
								</div>
							</div>
							</td>
							</tr>
							</table>
						</td>
						</tr>
						</table>
						</td>
					</tr>
					</table>
					<!-- END MODULE: Personal Letter -->
					</td>
					</tr>
					<tr>
					<td>
					</td>
					</tr>
				</table>
				</td>
				</tr>
				</table>
			</td>
			</tr>
			</table>
			</body>

		</html>
	`;

	const opcoes_email = {
		from: "lucas.galonet.com@gmail.com",
		to: destinatario,
		subject: "Confirme seu e-mail | LC Moda e Variedades",
		html: html
	};

	await transporter.sendMail(opcoes_email);
}
