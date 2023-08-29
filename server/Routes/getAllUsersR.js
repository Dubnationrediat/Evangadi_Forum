import getAllUsers from '../controllers/getAllUsers.js'
import express from 'express'

let getAllUsersRoute = express.Router()

getAllUsersRoute.get('/getAllUsers',getAllUsers)

export default getAllUsersRoute