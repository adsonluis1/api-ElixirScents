const { ObjectId } = require('bson')
const client = require('../db/conn')

module.exports = class ClientsModels {
    constructor(name,email,password){
        this.name = name
        this.email = email
        this.password = password
        this.cpf = null
        this.address = {}
        this.previousPurchases = []
    }

    async save (){
        await client.db('ElixirScents').collection('accounts').insertOne(this)
    }

    static async login (email){
        return await client.db('ElixirScents').collection('accounts').findOne({email:email})
    }

    static async buy (idClient, productBought){
        return await client.db("ElixirScents").collection('accounts').updateOne({_id:new ObjectId(idClient)},{$push:{previousPurchases:productBought}})
    }

    static async addAdditionalInfo(idClient,address, cpf){
        return await client.db("ElixirScents").collection('accounts').updateOne({_id:new ObjectId(idClient)},{$set:{address,cpf}})
    }

}