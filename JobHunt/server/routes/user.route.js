import express from 'express'
import { Login, logout, register, updateProfile } from '../controller/user.js'
import isAuthenticated from '../middleware/user.auth.js'
import { singleUpload } from '../middleware/multer.js'
const router = express.Router()

router.route('/register').post(singleUpload , register)
router.route('/login').post(Login)
router.route('/profile/update').post(isAuthenticated, singleUpload , updateProfile)
router.route('/logout').get(logout)
export default router;
