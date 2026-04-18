import { Router } from 'express'
import {
	createReviewByToken,
	getApprovedReviews,
	getReviewFormDataByToken,
} from '../controllers/reviewController.js'

const router = Router()

router.get('/:token', getReviewFormDataByToken)
router.post('/:token', createReviewByToken)
router.get('/', getApprovedReviews)

export default router
