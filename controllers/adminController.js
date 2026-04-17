import Dish from '../models/Dish.js'
import Gallery from '../models/Gallery.js'
import Reservation from '../models/Reservation.js'

export const getDashboardStats = async (req, res, next) => {
	try {
		const totalDishes = await Dish.countDocuments()
		const totalGalleryItems = await Gallery.countDocuments()
		const totalReservations = await Reservation.countDocuments()

		return res.status(200).json({
			success: true,
			stats: {
				totalDishes,
				totalGalleryItems,
				totalReservations,
			},
		})
	} catch (error) {
		next(error)
	}
}

export const getAdminBookings = async (req, res, next) => {
	try {
		const now = new Date()

		const [visitedBookings, upcomingBookings] = await Promise.all([
			Reservation.find({
				bookingStart: { $lt: now },
				status: { $in: ['confirmed', 'completed'] },
			}).sort({ bookingStart: -1 }),

			Reservation.find({
				bookingStart: { $gte: now },
				status: { $in: ['pending', 'confirmed'] },
			}).sort({ bookingStart: 1 }),
		])

		return res.status(200).json({
			success: true,
			visitedCount: visitedBookings.length,
			upcomingCount: upcomingBookings.length,
			visitedBookings,
			upcomingBookings,
		})
	} catch (error) {
		next(error)
	}
}
