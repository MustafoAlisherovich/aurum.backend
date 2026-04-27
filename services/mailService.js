import nodemailer from 'nodemailer'

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendMessage({ to, subject, html }) {
		const info = await this.transporter.sendMail({
			from: `"Aurum" <${process.env.SMTP_USER}>`,
			to,
			subject,
			html,
		})

		return info
	}
}

export default new MailService()
