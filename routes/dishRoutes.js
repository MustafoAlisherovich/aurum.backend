import { Router } from 'express'
import {
	createDish,
	deleteDish,
	getDishes,
	updateDish,
} from '../controllers/dishController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, getDishes)
router.post('/', requireAdminAuth, createDish)
router.put('/:id', requireAdminAuth, updateDish)
router.delete('/:id', requireAdminAuth, deleteDish)

export default router
