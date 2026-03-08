import { Router } from 'express'
import * as blogController from '../controllers/blogController'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'
import { blogPostSchema } from '../validations'

const router = Router()

router.get('/', blogController.getAllBlogPosts)
router.get('/slug/:slug', blogController.getBlogPostBySlug)
router.get('/:id', blogController.getBlogPostById)
router.post('/', authenticate, validate(blogPostSchema), blogController.createBlogPost)
router.put('/:id', authenticate, validate(blogPostSchema.partial()), blogController.updateBlogPost)
router.delete('/:id', authenticate, blogController.deleteBlogPost)

export default router
