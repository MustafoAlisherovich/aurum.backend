import { Router } from 'express'
import {
	cancelReservation,
	completeReservation,
	confirmReservation,
	deleteReservation,
	getReservationById,
	getReservations,
	updateReservationStatus,
} from '../controllers/reservationController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', getReservations)
router.get('/:id', getReservationById)

router.patch('/:id/status', requireAdminAuth, updateReservationStatus)
router.patch('/:id/confirm', requireAdminAuth, confirmReservation)
router.patch('/:id/cancel', requireAdminAuth, cancelReservation)
router.patch('/:id/complete', requireAdminAuth, completeReservation)

router.delete('/:id', requireAdminAuth, deleteReservation)

export default router
