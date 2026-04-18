import { Router } from 'express'
import {
	getRestaurants,
	upsertRestaurant,
} from '../controllers/restaurantController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, getRestaurants)
router.put('/', requireAdminAuth, upsertRestaurant)

export default router
