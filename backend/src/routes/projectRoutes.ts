import { Router } from 'express'
import * as projectController from '../controllers/projectController'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'
import { projectSchema } from '../validations'

const router = Router()

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProjectById)
router.post('/', authenticate, validate(projectSchema), projectController.createProject)
router.put('/:id', authenticate, validate(projectSchema.partial()), projectController.updateProject)
router.delete('/:id', authenticate, projectController.deleteProject)

export default router
