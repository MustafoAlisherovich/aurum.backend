import Review from '../models/Review'

export const getAllReviews = async (req, res, next) => {
	try {
		const data = req.body
		const reviews = await Review.find(data)

		res.status(200).json({ success: true, reviews })
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
