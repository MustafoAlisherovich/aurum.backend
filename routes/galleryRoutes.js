import { Router } from 'express'
import {
	createGallery,
	deleteGallery,
	getGallery,
} from '../controllers/galleryController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, getGallery)
router.post('/', requireAdminAuth, createGallery)
router.delete('/:id', requireAdminAuth, deleteGallery)

export default router
