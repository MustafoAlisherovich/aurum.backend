import { Router } from 'express'
import {
	getRestaurant,
	upsertRestaurant,
} from '../controllers/restaurantController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, getRestaurant)
router.put('/', requireAdminAuth, upsertRestaurant)

export default router
