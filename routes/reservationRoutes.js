import { Router } from 'express'
import {
	cancelReservation,
	completeReservation,
	confirmReservation,
	createReservation,
	deleteReservation,
	getReservationById,
	getReservations,
	updateReservationStatus,
} from '../controllers/reservationController.js'

const router = Router()

router.post('/', createReservation)
router.get('/', getReservations)
router.get('/:id', getReservationById)

router.patch('/:id/status', updateReservationStatus)
router.patch('/:id/confirm', confirmReservation)
router.patch('/:id/cancel', cancelReservation)
router.patch('/:id/complete', completeReservation)

router.delete('/:id', deleteReservation)

export default router
