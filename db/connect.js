const mongoose = require('mongoose')
//const uri = 'mongodb+srv://denziedon:denzie007@apicluster.y9rbh3y.mongodb.net/?retryWrites=true&w=majority'

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
