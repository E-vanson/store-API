require('dotenv').config()

const connectDB = require('../starter/db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async()=>{
    try {
       await connectDB(process.env.MONGO_URI) 
       Product.create(jsonProducts)
       console.log('successfull!!')
       process.exit(0)
    } catch (error) {
        console.log('Not successfull (:', error)
        process.exit(0)
    }
}

start()
