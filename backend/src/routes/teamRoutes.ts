import { Router } from 'express'
import * as teamController from '../controllers/teamController'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'
import { teamMemberSchema } from '../validations'

const router = Router()

router.get('/', teamController.getAllTeamMembers)
router.get('/:id', teamController.getTeamMemberById)
router.post('/', authenticate, validate(teamMemberSchema), teamController.createTeamMember)
router.put('/:id', authenticate, validate(teamMemberSchema.partial()), teamController.updateTeamMember)
router.delete('/:id', authenticate, teamController.deleteTeamMember)

export default router
