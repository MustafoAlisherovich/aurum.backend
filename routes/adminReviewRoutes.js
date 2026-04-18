import { Router } from 'express'
import {
	deleteReview,
	getAllReviews,
	updateReviewStatus,
} from '../controllers/reviewController.js'
import { requireAdminAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', requireAdminAuth, getAllReviews)
router.patch('/:id/status', requireAdminAuth, updateReviewStatus)
router.delete('/:id', requireAdminAuth, deleteReview)

export default router
