import { Router } from 'express'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, (req, res) => {
	res.status(200).json({
		ok: true,
		admin: req.admin,
		message: 'Admin panel is protected by JWT',
	})
})

router.get('/me', requireAdminAuth, (req, res) => {
	res.status(200).json({ admin: req.admin })
})

export default router
