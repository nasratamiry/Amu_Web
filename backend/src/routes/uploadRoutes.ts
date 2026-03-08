import { Router } from 'express'
import { upload } from '../middleware/upload'
import * as uploadController from '../controllers/uploadController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)
router.post('/', upload.single('image'), uploadController.uploadImage)

export default router
