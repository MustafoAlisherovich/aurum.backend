import { Router } from 'express'
import { getGallery } from '../controllers/galleryController.js'

const router = Router()

router.get('/', getGallery)

export default router
