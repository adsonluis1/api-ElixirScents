const ProductsModels = require('../models/Products')

module.exports = class ProductsControllers{
    static async addProduct (req,res){
        const {name,label,price,description,tags,aroma,commits,rate,amount}=req.body
        
        try {
            const product = new ProductsModels(name,label,price,description,tags,aroma,commits,rate,amount)
            await product.save()
            res.status(201).json({message:'ok'})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
        
    }

    static async getProducts (req,res){
       let label = req.baseUrl.replace('/','')
       try {
        label = label.charAt(0).toUpperCase() + label.slice(1)      
        const products = await ProductsModels.getProducts(label)
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
            const product = await ProductsModels.getProductById(label,id)
            res.json({product})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
        
        
    }
} 