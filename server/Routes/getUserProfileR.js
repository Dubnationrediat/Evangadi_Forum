import auth from '../auth/auth.js'
import getUserProfile from '../controllers/getUserProfile.js'
import express from 'express'

let getUserProfileRoute = express.Router()

getUserProfileRoute.get('/getUserProfile',auth,getUserProfile)

export default getUserProfileRoute;