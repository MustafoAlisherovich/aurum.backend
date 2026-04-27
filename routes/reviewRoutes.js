import { Router } from 'express'
import {
	createReviewByToken,
	getApprovedReviews,
} from '../controllers/reviewController.js'

const router = Router()

router.get('/', getApprovedReviews)
router.post('/:token', createReviewByToken)

export default router
