const productRoutes = require('./routes/products')
require('express-async-errors')

//set up the server
const express = require('express')
const app = express()



const connectDB =require('./db/connect')

//set up the dotenv
require('dotenv').config()


//import the middleware
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.use(express.json())

//products


//route
app.get('/', (req, res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productRoutes)

app.use(errorHandler)
app.use(notFound)
//products route



//start server
const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
     app.listen(port, console.log(`server is listening on port ${port}....`))   
    } catch (error) {
        console.log(error)
    }
}
//console.log()

start()
