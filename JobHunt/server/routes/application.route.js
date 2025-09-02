import express from "express";
import isAuthenticated from '../middleware/user.auth.js'
import { applyJob, getApplicant,  getAppliedJobs, updateStatus } from "../controller/applications.controller.js";
const router = express.Router()

router.route('/apply/:id').get(isAuthenticated , applyJob)
router.route('/getAppliedJobs').get(isAuthenticated , getAppliedJobs)
router.route('/:id/getApplicant').get(isAuthenticated , getApplicant)
router.route('/status/:id/update').post(isAuthenticated , updateStatus)

export default router;