const {MongoClient} = require('mongodb')
const localUrl = 'mongodb://localhost:27017'

const client = new MongoClient(localUrl)

const run = async ()=>{
    try {
        await client.connect()
        console.log('conectado')
    } catch (error) {
        console.log(`Error ao conectar o mongo - ${error}`)
    }
}

run()

module.exports = client