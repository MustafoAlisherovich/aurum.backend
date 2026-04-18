import crypto from 'crypto'
import Reservation from '../models/Reservation.js'
import mailService from './mailService.js'

export const sendReviewEmail = async reservationId => {
	const reservation = await Reservation.findById(reservationId)

	if (!reservation) return

	const token = crypto.randomBytes(32).toString('hex')

	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

	reservation.reviewToken = token
	reservation.reviewTokenExpiresAt = expires
	await reservation.save()

	const reviewLink = `http://localhost:3000/review/${token}`

	await mailService.sendMessage({
		to: reservation.email,
		subject: 'Your opinion is important to us',
		html: `
		<h2>Salom ${reservation.fullName}</h2>
			<p>Sizning tashrifingiz uchun rahmat!</p>
			<a href="${reviewLink}">
				Review qoldirish
			</a>
		`,
	})
}
