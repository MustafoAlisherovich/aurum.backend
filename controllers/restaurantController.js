import Restaurant from '../models/Restaurant.js'
import { getCurrentStatus } from '../utils/index.js'

export const getRestaurant = async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne()

		if (!restaurant) {
			return res
				.status(404)
				.json({ success: false, message: 'Restaurant not found' })
		}

		const status = getCurrentStatus(restaurant.workingHours)

		return res.status(200).json({ success: true, restaurant, status })
	} catch (error) {
		next(error)
	}
}

export const upsertRestaurant = async (req, res, next) => {
	try {
		const data = req.body
		const restaurant = await Restaurant.findOneAndUpdate({}, data, {
			returnDocument: 'after',
			upsert: true,
			runValidators: true,
		})

		return res.status(200).json({
			success: true,
			message: 'Restaurant updated successfully',
			restaurant,
		})
	} catch (error) {
		next(error)
	}
}
