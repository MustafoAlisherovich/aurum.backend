import crypto from 'crypto'
import Reservation from '../models/Reservation.js'
import emailTemplate from '../template/emailTemplate.js'
import mailService from './mailService.js'

export const sendReviewEmail = async reservationId => {
	const reservation = await Reservation.findById(reservationId)

	if (!reservation) return

	const token = crypto.randomBytes(32).toString('hex')

	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

	await Reservation.findByIdAndUpdate(
		reservationId,
		{
			reviewToken: token,
			reviewTokenExpiresAt: expires,
		},
		{ runValidators: true },
	)

	const reviewLink = `${process.env.CLIENT_URL}/review/${token}`

	await mailService.sendMessage({
		to: reservation.email,
		subject: 'Your opinion is important to us',
		html: emailTemplate(reservation, reviewLink),
	})
}
