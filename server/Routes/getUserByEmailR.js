import getUserByEmail from '../controllers/getUserByEmail.js'
import emailChecker from '../controllers/emailCheckerForPasswordC.js'
import express from 'express'

let getUserByEmailRoute = express.Router()

getUserByEmailRoute.get('/getUserByEmail',getUserByEmail)
getUserByEmailRoute.post('/passUpdate',emailChecker)

export default getUserByEmailRoute