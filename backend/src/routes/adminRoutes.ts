import { Router } from 'express'
import * as adminController from '../controllers/adminController'
import { authenticate } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { adminLoginSchema } from '../validations'

const router = Router()

router.post('/login', validate(adminLoginSchema), adminController.login)
router.get('/stats', authenticate, adminController.getStats)

export default router
