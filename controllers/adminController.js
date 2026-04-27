import Dish from '../models/Dish.js'
import Reservation from '../models/Reservation.js'

export const getDashboardStats = async (req, res, next) => {
	try {
		const totalDishes = await Dish.countDocuments()

		const totalReservations = await Reservation.countDocuments()

		const upcomingBookings = await Reservation.countDocuments({
			status: 'pending',
		})

		const visitedBookings = await Reservation.countDocuments({
			status: 'completed',
		})

		return res.status(200).json({
			success: true,
			stats: {
				totalDishes,
				totalReservations,
				upcomingBookings,
				visitedBookings,
			},
		})
	} catch (error) {
		next(error)
	}
}
