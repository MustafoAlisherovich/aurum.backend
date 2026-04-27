import { Router } from 'express'
import multer from 'multer'
import {
	createGallery,
	deleteGallery,
	getAdminGallery,
} from '../controllers/galleryController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()
const upload = multer()

router.get('/', requireAdminAuth, getAdminGallery)
router.post('/', requireAdminAuth, upload.single('image'), createGallery)
router.delete('/:id', requireAdminAuth, deleteGallery)

export default router
