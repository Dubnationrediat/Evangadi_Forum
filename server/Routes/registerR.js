import registration from '../controllers/register.js'
import express from 'express'

let registrationRoute = express()

registrationRoute.post('/register',registration)

export default registrationRoute