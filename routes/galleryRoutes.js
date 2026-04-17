import { Router } from 'express'
import {
	createGallery,
	deleteGallery,
	getGallery,
} from '../controllers/galleryController.js'

const router = Router()

router.get('/', getGallery)
router.post('/', createGallery)
router.delete('/:id', deleteGallery)

export default router
