import { Router } from 'express'
import * as messagesController from '../controllers/messagesController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)
router.get('/', messagesController.getAllMessages)
router.delete('/:id', messagesController.deleteMessage)

export default router
