const bcrypt = require('bcrypt')
const ClientsModels = require('../models/Clients')
const ProductsModels = require('../models/Products')
const {joinProductsIntoBag} = require('../utils/utils')

module.exports = class ClientControllers{
    static async addAccount (req,res){
        const {name,password,email} = req.body
        const saltRounds = 10
        try {
            const user = await ClientsModels.login(email)
            if(user?.email == email){
                res.status(400).json({message:"already registered user"})
                return
            }
            const hashedPassword = await bcrypt.hashSync(password,saltRounds)
            const use = new ClientsModels(name,email,hashedPassword)
            await use.save()
            res.status(201).json({message:'Account add'})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async login (req,res){
        const {email,password} = req.body
        try {
            const user = await ClientsModels.login(email)
            
            if(!user){
                res.status(400).json({message:"User not found"})
                return
            }
            const done = await bcrypt.compare(password, user.password)
            if(done){
                res.json({message:user})
            }else{
                res.status(400).json({message:'Incorrect password'})
            }
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async addAdditionalInfo(req, res){
       const {street, cep, city, number, neighborhood, idClient, cpf,state} = req.body
       const address = {
            street,
            cep,
            city,
            number,
            neighborhood,
            state
       }
       
       try {
            await ClientsModels.addAdditionalInfo(idClient,address, cpf)
            res.json({message:"Changed information"})
       } catch (error) {
            res.status(400).json({error:error.message})
       }

    }

    static async getProducIntoBag (req,res){
        const {idClient} = req.params
        try {
            const {bag} = await ClientsModels.getProductsBag(idClient)
            res.json({bag})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async addProducIntoBag (req, res){
        const {idClient, product} = req.body
        try {
            const {bag} = await ClientsModels.getProductsBag(idClient)
            const newBag = joinProductsIntoBag(product,bag)
            await ClientsModels.addProductIntoBag(idClient,newBag)
            res.json({message:'Product add'})
        } catch (error) {
            res.status(400).json({message:error.message})    
        }

    }

    static async removeProducIntoBag (req,res){
        const {idClient} = req.params
        const {idProduct} = req.body

        if(typeof idProduct == 'object'){
            idProduct.map(async (idProductCurrent, index)=>{
                try {
                    await ClientsModels.removeProductIntoBag(idClient,idProductCurrent)
                    
                    if(idProduct.length == index + 1)
                        res.json({message:"Removed items"})
                } catch (error) {
                    res.status(400).json({error:error.message})
                }
            })

            return
        }

        try {
            await ClientsModels.removeProductIntoBag(idClient,idProduct)
            res.json({message:"Removed item"})
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

    static async buy (req, res){
        let {idProduct, user,amount,labelProduct} = req.body
        
        if(user.cpf == null){
            res.status(400).json({message:"You cannot buy without registering your CPF"})
            return
        }

        if(user.address.length == 0){
            res.status(400).json({message:"You can't buy without the address"})
            return
        }

        if(typeof idProduct == 'object'){
            idProduct.map( async (idProductCurrent, index)=>{
                try {
                    let product = await ProductsModels.getProductById(labelProduct, idProductCurrent)
                    if(product.amount <= 0){
                        res.status(400).json({message:"We don't have stock"})
                        return
                    }
                    product.amount = amount[index]
                    product.price *= amount[index]
                    await ClientsModels.buy(user._id,product)
                    await ProductsModels.bought(product.label,product._id)
                    if(idProduct.length == index + 1)
                        res.json({message:"Product bougth"})
                } catch (error) {
                    res.status(400).json({error:error.message})
                }
            })

            return
        }

        try {
            let product = await ProductsModels.getProductById(labelProduct, idProduct)
            if(product.amount <= 0){
                res.status(400).json({message:"We don't have stock"})
                return
            }
            product.amount = amount
            product.price *= amount
            await ClientsModels.buy(user._id,product)
            await ProductsModels.bought(product.label,product._id)
            res.json({message:"Product bougth"})
        } catch (error) {
            res.status(400).json({error:error.message})
        }

    }  

}