import getUserByEmail from '../controllers/getUserByEmail.js'
import express from 'express'

let getUserByEmailRoute = express.Router()

getUserByEmailRoute.get('/getUserByEmail',getUserByEmail)

export default getUserByEmailRoute