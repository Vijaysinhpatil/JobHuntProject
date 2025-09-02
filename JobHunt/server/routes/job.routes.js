import express from 'express'
import isAuthenticated from '../middleware/user.auth.js'
import { getAdminJobs, getJobId, getJobs, postJob } from '../controller/job.controller.js'
const router = express.Router()

router.route('/postjobs').post(isAuthenticated , postJob)
//authenticated Person can access this
router.route('/getAlljobs').get(isAuthenticated  , getJobs)
router.route('/getAlljobs/:id').get(isAuthenticated , getJobId)
router.route('/getadminjobs').get(isAuthenticated , getAdminJobs)
export default router;