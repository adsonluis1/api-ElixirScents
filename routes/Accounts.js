const express = require('express')
const routes = express.Router()
const ClientsControllers = require('../controllers/Clients')
const ProductsControllers = require('../controllers/Products')

routes.get('/getHistory/:idClient', ClientsControllers.getPurchaseHistory)
routes.get('/getBag/:idClient', ClientsControllers.getProducIntoBag)
routes.get('/search/:product', ProductsControllers.searchProcuts)
routes.post('/create', ClientsControllers.addAccount)
routes.post('/login', ClientsControllers.login)
routes.post('/addProductIntoBag', ClientsControllers.addProducIntoBag)
routes.post('/buy', ClientsControllers.buy)
routes.patch('/removeProductIntoBag/:idClient/', ClientsControllers.removeProducIntoBag)
routes.patch('/addAdditionalInfo', ClientsControllers.addAdditionalInfo)

module.exports = routes