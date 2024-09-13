const express = require('express')
const routes = express.Router()
const ClientsControllers = require('../controllers/Clients')

routes.get('/getHistory/:idClient', ClientsControllers.getPurchaseHistory)
routes.get('/getBag/:idClient', ClientsControllers.getProducIntoBag)
routes.post('/create', ClientsControllers.addAccount)
routes.post('/login', ClientsControllers.login)
routes.post('/addProductIntoBag', ClientsControllers.addProducIntoBag)
routes.post('/buy', ClientsControllers.buy)
routes.patch('/removeProductIntoBag/:idClient/', ClientsControllers.removeProducIntoBag)
routes.patch('/addAdditionalInfo', ClientsControllers.addAdditionalInfo)

module.exports = routes