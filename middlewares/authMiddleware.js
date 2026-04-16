import jwt from 'jsonwebtoken'

function getJwtSecret() {
	return process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
}

export function requireAdminAuth(req, res, next) {
	try {
		const authHeader = req.headers.authorization
		const cookieToken = req.cookies?.admin_jwt

		const tokenFromHeader = authHeader?.startsWith('Bearer ')
			? authHeader.slice('Bearer '.length).trim()
			: null

		const token = tokenFromHeader || cookieToken
		if (!token) {
			return res.status(401).json({ error: 'Unauthorized: missing token' })
		}

		const payload = jwt.verify(token, getJwtSecret())

		// `sub` is set to admin username when signing the token.
		req.admin = {
			username: payload?.sub || payload?.username,
			role: payload?.role || 'admin',
		}

		if (!req.admin.username) {
			return res
				.status(401)
				.json({ error: 'Unauthorized: invalid token payload' })
		}

		return next()
	} catch (err) {
		return res
			.status(401)
			.json({ error: 'Unauthorized: token invalid or expired' })
	}
}
