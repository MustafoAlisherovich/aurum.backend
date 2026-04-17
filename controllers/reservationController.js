import Reservation from '../models/Reservation.js'
import Restaurant from '../models/Restaurant.js'
import {
	DEFAULT_DURATION_MINUTES,
	MAX_CAPACITY,
} from '../scripts/rules-reservation.js'
import {
	getDayKeyFromDate,
	getTotalMinutes,
	isValidStatus,
	parseTimeToMinutes,
} from '../utils/index.js'

export const createReservation = async (req, res, next) => {
	try {
		const { fullName, phoneNumber, email, date, time, guests, description } =
			req.body

		if (!fullName || !phoneNumber || !email || !date || !time || !guests) {
			return res.status(400).json({
				success: false,
				message: 'All required fields must be provided',
			})
		}

		const guestCount = Number(guests)

		if (Number.isNaN(guestCount) || guestCount < 1) {
			return res.status(400).json({
				success: false,
				message: 'Guest count must be at least 1',
			})
		}

		if (guestCount > MAX_CAPACITY) {
			return res.status(400).json({
				success: false,
				message: `Maximum allowed guests is ${MAX_CAPACITY}`,
			})
		}

		const bookingStart = new Date(`${date}T${time}:00`)

		if (Number.isNaN(bookingStart.getTime())) {
			return res.status(400).json({
				success: false,
				message: 'Invalid date or time',
			})
		}

		if (bookingStart <= new Date()) {
			return res.status(400).json({
				success: false,
				message: 'Reservation time must be in the future',
			})
		}

		const bookingEnd = new Date(
			bookingStart.getTime() + DEFAULT_DURATION_MINUTES * 60 * 1000,
		)

		const restaurant = await Restaurant.findOne()

		if (!restaurant) {
			return res.status(500).json({
				success: false,
				message: 'Restaurant working hours are not configured',
			})
		}

		const dayKey = getDayKeyFromDate(bookingStart)
		const dayConfig = restaurant.workingHours?.[dayKey]

		if (!dayConfig || dayConfig.isClosed) {
			return res.status(400).json({
				success: false,
				message: 'Restaurant is closed on selected day',
			})
		}

		const openMinutes = parseTimeToMinutes(dayConfig.openTime)
		const closeMinutes = parseTimeToMinutes(dayConfig.closeTime)

		if (openMinutes === null || closeMinutes === null) {
			return res.status(500).json({
				success: false,
				message: 'Invalid working hours configuration',
			})
		}

		const startMinutes = getTotalMinutes(bookingStart)
		const endMinutes = getTotalMinutes(bookingEnd)

		if (startMinutes < openMinutes || endMinutes > closeMinutes) {
			return res.status(400).json({
				success: false,
				message: 'Selected time is outside working hours',
			})
		}

		const overlappingReservations = await Reservation.find({
			status: { $in: ['pending', 'confirmed'] },
			bookingStart: { $lt: bookingEnd },
			bookingEnd: { $gt: bookingStart },
		})

		const reservedGuests = overlappingReservations.reduce(
			(sum, reservation) => sum + reservation.guests,
			0,
		)

		if (reservedGuests + guestCount > MAX_CAPACITY) {
			return res.status(409).json({
				success: false,
				message: 'Not enough capacity for this time slot',
			})
		}

		const reservation = await Reservation.create({
			fullName,
			phoneNumber,
			email,
			guests: guestCount,
			bookingStart,
			bookingEnd,
			durationMinutes: DEFAULT_DURATION_MINUTES,
			description: description || '',
			status: 'pending',
		})

		return res.status(201).json({
			success: true,
			message: 'Reservation created successfully',
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const getReservations = async (req, res, next) => {
	try {
		const { status } = req.query

		const filter = {}

		if (status) {
			if (!isValidStatus(status)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid status filter',
				})
			}
			filter.status = status
		}

		const reservations = await Reservation.find(filter).sort({
			bookingStart: 1,
		})

		return res.status(200).json({
			success: true,
			count: reservations.length,
			reservations,
		})
	} catch (error) {
		next(error)
	}
}

export const getReservationById = async (req, res, next) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		return res.status(200).json({
			success: true,
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const updateReservationStatus = async (req, res, next) => {
	try {
		const { id } = req.params
		const { status } = req.body

		if (!status || !isValidStatus(status)) {
			return res.status(400).json({
				success: false,
				message:
					'Valid status is required: pending, confirmed, cancelled, completed',
			})
		}

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status === 'completed' && status !== 'completed') {
			return res.status(400).json({
				success: false,
				message: 'Completed reservation cannot be changed',
			})
		}

		reservation.status = status
		await reservation.save()

		return res.status(200).json({
			success: true,
			message: `Reservation status updated to ${status}`,
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const confirmReservation = async (req, res, next) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status === 'cancelled') {
			return res.status(400).json({
				success: false,
				message: 'Cancelled reservation cannot be confirmed',
			})
		}

		if (reservation.status === 'completed') {
			return res.status(400).json({
				success: false,
				message: 'Completed reservation cannot be confirmed again',
			})
		}

		reservation.status = 'confirmed'
		await reservation.save()

		return res.status(200).json({
			success: true,
			message: 'Reservation confirmed successfully',
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const cancelReservation = async (req, res, next) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status === 'completed') {
			return res.status(400).json({
				success: false,
				message: 'Completed reservation cannot be cancelled',
			})
		}

		reservation.status = 'cancelled'
		await reservation.save()

		return res.status(200).json({
			success: true,
			message: 'Reservation cancelled successfully',
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const completeReservation = async (req, res, next) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findById(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		if (reservation.status === 'cancelled') {
			return res.status(400).json({
				success: false,
				message: 'Cancelled reservation cannot be completed',
			})
		}

		reservation.status = 'completed'
		await reservation.save()

		return res.status(200).json({
			success: true,
			message: 'Reservation completed successfully',
			reservation,
		})
	} catch (error) {
		next(error)
	}
}

export const deleteReservation = async (req, res, next) => {
	try {
		const { id } = req.params

		const reservation = await Reservation.findByIdAndDelete(id)

		if (!reservation) {
			return res.status(404).json({
				success: false,
				message: 'Reservation not found',
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Reservation deleted successfully',
		})
	} catch (error) {
		next(error)
	}
}
