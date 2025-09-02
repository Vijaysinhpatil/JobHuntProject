import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'

//importing all the routes
import UserRouter from './routes/user.route.js';
import CompanyRoutes from './routes/company.route.js'
import jobRoutes from './routes/job.routes.js'
import jobapply from './routes/application.route.js'
dotenv.config()
import connectDB from './utils/db.js';
const app = express()
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
const corsOptions = {
       origin: 'http://localhost:5173', // Your frontend URL
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// Routes or API's 
app.use('/api/v1/user' , UserRouter)
app.use('/api/v1/company' , CompanyRoutes)
app.use('/api/v1/jobs',jobRoutes)
app.use('/api/v1/jobapply',jobapply)
//Connecting Database
connectDB()
app.listen(PORT , ()=>{
    
    console.log(`Server is Getting Connected At PORT => ${PORT}`);
})