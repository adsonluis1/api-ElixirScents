const { ObjectId } = require('bson')
const client = require('../db/conn')

module.exports = class ProductsModels {
    constructor(name,label,price,description,tags,aroma,commits,rate, amount){
        this.name = name
        this.label = label
        this.price = price
        this.description = description
        this.tags = tags
        this.aroma = aroma
        this.commits = commits
        this.rate = rate
        this.amount = amount
    }

    async save (){
        await client.db('ElixirScents').collection(this.label).insertOne(this)
    }

    static async getProducts(label){
        return await client.db('ElixirScents').collection(label).find().toArray()
    } 

    static async getProductById(label, id){
        return await client.db('ElixirScents').collection(label).findOne({_id:new ObjectId(id)})
    }

    static async bought(label, idProduct){
        await client.db('ElixirScents').collection(label).updateOne({_id:new ObjectId(idProduct)},{$inc:{amount: -1}})
    }


}