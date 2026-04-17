import { Router } from 'express'
import {
	createDish,
	deleteDish,
	getDishes,
	updateDish,
} from '../controllers/dishController.js'

const router = Router()

router.get('/', getDishes)
router.post('/', createDish)
router.put('/:id', updateDish)
router.delete('/:id', deleteDish)

export default router
