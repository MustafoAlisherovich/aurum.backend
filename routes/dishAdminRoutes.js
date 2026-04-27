import { Router } from 'express'
import multer from 'multer'
import {
	createDish,
	deleteDish,
	getAdminDishes,
	updateDish,
} from '../controllers/dishController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()
const upload = multer()

router.get('/', requireAdminAuth, getAdminDishes)
router.post('/', requireAdminAuth, upload.single('image'), createDish)
router.put('/:id', requireAdminAuth, upload.single('image'), updateDish)
router.delete('/:id', requireAdminAuth, deleteDish)

export default router
