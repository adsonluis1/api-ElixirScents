const express = require('express')
const routes = express.Router()
const ClientsControllers = require('../controllers/Clients')

routes.post('/create', ClientsControllers.addAccount)
routes.post('/login', ClientsControllers.login)
routes.post('/buy', ClientsControllers.buy)
routes.patch('/addAdditionalInfo', ClientsControllers.addAdditionalInfo)

module.exports = routes