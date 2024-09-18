const ProductsModels = require('../models/Products')
const {checkChange} = require('../utils/utils')

module.exports = class ProductsControllers{
    static async addProduct (req,res){
        let {name,label,price,description,tags,aroma,commits,rate,amount,sexo}=req.body
        tags = tags.split(',')
        price = Number(price)
        rate = Number(rate)
        amount = Number(amount)
        commits = []
        const profileImage = req.file 
        
        try {
            const checkExistName = await ProductsModels.getProductByName(label, name)
            if(checkExistName != null){
                res.status(400).json({error:"Name already exists"})
                return
            }
            const product = new ProductsModels(name,label,price,description,tags,aroma,commits,rate,amount, profileImage,sexo)
            await product.save()
            res.status(201).json({message:'ok'})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async searchProcuts (req,res){
        let {product} = req.params
        let marcas = ["Chanel"]
        let products = []
        let foundProducts = []
        let regex = new RegExp(product,"i")

        marcas.map(async (marca,index)=>{
            try {
                let product = await ProductsModels.getProducts(marca)
                product?.map(currentProduct=>{
                    let urlImg = `${req.protocol}://${req.get('host')}/${currentProduct.profileImage.path}`
                    currentProduct.profileImage.path = urlImg
                })
                products.push(...product)
                if(marcas.length == index +1){
                    products.filter((currentProduct,index)=>{
                        if(currentProduct.name.search(regex) != -1){
                            foundProducts.push(currentProduct)
                        }
                        if(products.length == index+1){
                            res.json({foundProducts})
                        }
                    })
                }
            } catch (error) {
                res.status(400).json({error:error.message})
            }
           
        })        
    }

    static async getProducts (req,res){
       let label = req.baseUrl.replace('/','')
       label = label.charAt(0).toUpperCase() + label.slice(1)      
       
       try {
        const products = await ProductsModels.getProducts(label)
        products?.map(product=>{
            let urlImg = `${req.protocol}://${req.get('host')}/${product.profileImage.path}`
            product.profileImage.path = urlImg
        })
        res.json({products})
        } catch (error) {
            res.status(400).json({error:error.message})
       }
    }

    static async getProductById (req,res){
        const {id} = req.params
        let label = req.baseUrl.replace('/','')
        label = label.charAt(0).toUpperCase() + label.slice(1)
        
        try {
            let product = await ProductsModels.getProductById(label,id)
            if(product == null){
                res.status(404).json({error:"Product not found"})
            }
            let urlImg = `${req.protocol}://${req.get('host')}/${product.profileImage.path}`
            product.profileImage.path = urlImg
            res.json({product})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async removeProduct (req,res){
        const {idProduct} = req.params
        let label = req.baseUrl.replace('/','')
        label = label.charAt(0).toUpperCase() + label.slice(1)
        
        try {
            await ProductsModels.removeProduct(label,idProduct)
            res.json({message:"Removed produc"})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async editProduct (req, res){
        const {idProduct} = req.params
        let params = req.body
        let label = req.baseUrl.replace('/','')
        label = label.charAt(0).toUpperCase() + label.slice(1)

        try {
            const product = await ProductsModels.getProductById(label,idProduct)
            const changes = checkChange(product, params)

            if(Object.keys(changes).length > 0){
                await ProductsModels.editProduct(label,idProduct,changes)
            }
            res.json({message:"Edited product"})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
        
    }
} 