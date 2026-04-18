import Reservation from '../models/Reservation.js'
import Review from '../models/Review.js'

export const getReviewFormDataByToken = async (req, res, next) => {
	try {
		const { token } = req.query

		if (!token) {
			return res
				.status(400)
				.json({ success: false, message: 'Token is required' })
		}

		const reservation = await Reservation.findOne({
			reviewToken: token,
		}).populate('restaurant name')

		if (!reservation) {
			return res.status(404).json({ success: false, message: 'Invalid token' })
		}

		if (reservation.reviewTokenExpiresAt < Date.now()) {
			return res.status(400).json({ success: false, message: 'Token expired' })
		}

		return res.status(200).json({
			success: false,
			data: {
				reservationId: reservation._id,
				fullName: reservation._fullName,
				restaurant: reservation.restaurant.name,
			},
		})
	} catch (error) {
		next(error)
	}
}

export const getApprovedReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find({ status: 'approved' })
			.select('fullName rating comment createdAt')
			.sort({ createdAt: -1 })

		return res.status(200).json({
			success: true,
			reviews,
		})
	} catch (error) {
		next(error)
	}
}

export const getAllReviews = async (req, res, next) => {
	try {
		const data = req.body
		const reviews = await Review.find(data)

		res.status(200).json({ success: true, reviews })
	} catch (error) {
		next(error)
	}
}

export const createReviewByToken = async (req, res, next) => {
	try {
		const { token } = req.params
		const { rating, comment } = req.body

		const reservation = await Reservation.findOne({
			reviewToken: token,
			reviewTokenExpiresAt: { $gt: new Date() },
		})

		if (!reservation) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid or expired token' })
		}

		if (reservation.reviewSubmitted) {
			return res
				.status(400)
				.json({ success: false, message: 'Review already submitted' })
		}

		const review = await Review.create({
			reservation: reservation._id,
			fullName: reservation.fullName,
			email: reservation.email,
			rating,
			comment,
		})

		reservation.reviewSubmitted = true
		reservation.reviewToken = null
		reservation.reviewTokenExpiresAt = null
		await reservation.save()

		return res.status(201).json({ success: true, review })
	} catch (error) {
		next(error)
	}
}

export const updateReviewStatus = async (req, res, next) => {
	try {
		const { id } = req.params

		const review = await Review.findById(id)

		if (!review) {
			return res
				.status(404)
				.json({ success: false, message: 'Review not found' })
		}

		if (review.status !== 'pending') {
			return res.status(400).json({
				success: false,
				message: `Review already ${review.status}`,
			})
		}

		review.status === 'approved'
		await review.save()

		return res.status(200).json({ success: true, review })
	} catch (error) {
		next(error)
	}
}
export const deleteReview = async (req, res, next) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.id)

		if (!review) {
			return res
				.status(404)
				.json({ success: false, message: 'Review not found' })
		}

		res.status(200).json({ success: true, review })
	} catch (error) {
		next(error)
	}
}
