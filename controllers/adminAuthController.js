import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let adminPasswordHashCache = null
let adminPasswordCacheValue = null

function getJwtSecret() {
	return process.env.JWT_SECRET
}

function getJwtExpiresIn() {
	return process.env.JWT_EXPIRES_IN
}

function getAdminUsername() {
	return process.env.ADMIN_USERNAME
}

function getAdminPasswordHash() {
	// Allow a precomputed hash (useful for production), otherwise hash the env password lazily.
	if (process.env.ADMIN_PASSWORD_HASH) return process.env.ADMIN_PASSWORD_HASH

	const adminPassword = process.env.ADMIN_PASSWORD
	if (!adminPasswordHashCache || adminPasswordCacheValue !== adminPassword) {
		adminPasswordCacheValue = adminPassword
		adminPasswordHashCache = bcrypt.hashSync(adminPassword, 10)
	}

	return adminPasswordHashCache
}

function getCookieSecureFlag() {
	return process.env.NODE_ENV === 'production'
}

function getCookieMaxAgeMs() {
	const expiresIn = getJwtExpiresIn()
	if (typeof expiresIn === 'string') {
		if (expiresIn.endsWith('d'))
			return Number(expiresIn.slice(0, -1)) * 24 * 60 * 60 * 1000
		if (expiresIn.endsWith('h'))
			return Number(expiresIn.slice(0, -1)) * 60 * 60 * 1000
		if (expiresIn.endsWith('m'))
			return Number(expiresIn.slice(0, -1)) * 60 * 1000
	}
	return 24 * 60 * 60 * 1000
}

export function loginAdmin(req, res, next) {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return res
				.status(400)
				.json({ error: 'username and password are required' })
		}

		const adminUsername = getAdminUsername()
		const adminPasswordHash = getAdminPasswordHash()

		const okUsername = username === adminUsername
		const okPassword = bcrypt.compareSync(password, adminPasswordHash)

		if (!okUsername || !okPassword) {
			return res.status(401).json({ error: 'Invalid credentials' })
		}

		const jwtSecret = getJwtSecret()
		const jwtExpiresIn = getJwtExpiresIn()

		const token = jwt.sign({ sub: adminUsername }, jwtSecret, {
			expiresIn: jwtExpiresIn,
		})

		// Store token as httpOnly cookie so the admin UI can't read it via JS.
		res.cookie('admin_jwt', token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: getCookieSecureFlag(),
			maxAge: getCookieMaxAgeMs(),
		})

		return res.status(200).json({ token, admin: { username: adminUsername } })
	} catch (error) {
		next(error)
	}
}

export function logoutAdmin(_req, res) {
	// Clear cookie in browser; clients that use `Authorization: Bearer <token>` should just drop the token.
	res.clearCookie('admin_jwt')
	return res.status(200).json({ ok: true })
}
