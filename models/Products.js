const { ObjectId } = require('bson')
const client = require('../db/conn')

module.exports = class ProductsModels {
    constructor(name,label,price,description,tags,aroma,commits,rate, amount,profileImage,sexo){
        this.name = name
        this.label = label
        this.price = price
        this.description = description
        this.tags = tags
        this.aroma = aroma
        this.commits = commits
        this.rate = rate
        this.amount = amount
        this.profileImage = profileImage
        this.sexo = sexo
    }

    async save (){
        await client.db('ElixirScents').collection(this.label).insertOne(this)
    }

    static async getProducts(label){
        return await client.db('ElixirScents').collection(label).find().toArray()
    } 

    static async getProductById(label, idProduct){
        return await client.db('ElixirScents').collection(label).findOne({_id:new ObjectId(idProduct)})
    }

    static async getProductByName(label, productName){
        return await client.db('ElixirScents').collection(label).findOne({name:productName})
    }

    static async removeProduct(label, idProduct){
        await client.db('ElixirScents').collection(label).deleteOne({_id:new ObjectId(idProduct)})
    }

    static async editProduct(label,idProduct, changes){
        await client.db('ElixirScents').collection(label).updateOne({_id:new ObjectId(idProduct)},{$set:changes})
    }

    static async bought(label, idProduct, amount){
        await client.db('ElixirScents').collection(label).updateOne({_id:new ObjectId(idProduct)},{$inc:{amount: -amount}})
    }
}