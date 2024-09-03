const express = require('express')
const app = express()
const chanelRouter = require('./routes/Chanel')
const accountsRouter = require('./routes/Accounts')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/chanel', chanelRouter)
app.use('/account',accountsRouter)

app.get('/',(req,res)=>{
    res.json({message:"Ola mundo"})
})

app.listen(3333,()=>{
    console.log('rodando')
})