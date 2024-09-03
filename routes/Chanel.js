const express = require('express')
const routes = express.Router()
const controllers = require('../controllers/Products')

routes.get('/catalago', controllers.getProducts)
routes.get('/catalago/:id', controllers.getProductById)
routes.post('/addProduct',controllers.addProduct)


module.exports = routes