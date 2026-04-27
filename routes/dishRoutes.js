import { Router } from 'express'
import { getDishes } from '../controllers/dishController.js'

const router = Router()

router.get('/', getDishes)

export default router
