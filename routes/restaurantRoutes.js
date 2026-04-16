import { Router } from 'express'
import {
	getRestaurants,
	upsertRestaurant,
} from '../controllers/restaurantController.js'

const router = Router()

router.get('/', getRestaurants)
router.put('/', upsertRestaurant)

export default router
