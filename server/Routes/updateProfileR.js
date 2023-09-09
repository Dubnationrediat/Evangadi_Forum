import express from 'express'
import updatePassword from '../controllers/updateUserPassword.js'

let updateProfile = express.Router()
updateProfile.post('/updatePassword',updatePassword)

export default updateProfile