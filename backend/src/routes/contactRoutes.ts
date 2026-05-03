import { Router } from 'express'
import * as contactController from '../controllers/contactController'
import { validate } from '../middleware/validate'
import { contactMessageSchema } from '../validations'

const router = Router()

router.post('/', validate(contactMessageSchema), contactController.createContactMessage)

export default router
