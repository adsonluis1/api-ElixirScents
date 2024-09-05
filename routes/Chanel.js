const express = require('express')
const routes = express.Router()
const upload = require('../config/multer')
const controllers = require('../controllers/Products')

routes.get('/catalogo', controllers.getProducts)
routes.get('/catalogo/:id', controllers.getProductById)
routes.post('/addProduct',upload.single('profileImage') ,controllers.addProduct)
routes.patch('/editProduct/:idProduct', controllers.editProduct)
routes.delete('/removeProduct/:idProduct',controllers.removeProduct)

module.exports = routes