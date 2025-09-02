import express from 'express'
import isAuthenticated from "../middleware/user.auth.js"
import { registerCompany, getCompany , getCompanyById , updateCompany} from '../controller/company.controller.js'

const router = express.Router()

router.route('/registeringCompany').post(isAuthenticated , registerCompany)
router.route('/getCompany').get(isAuthenticated , getCompany) //gives the company names based on the current user
router.route('/getCompany/:id').get(isAuthenticated , getCompanyById)//gives all Company name which is choose by an user
router.route('/updateCompany/:id').put(isAuthenticated , updateCompany)

export default router;