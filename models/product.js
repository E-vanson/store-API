const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[ true, 'Please enter the product name']
    },
    price:{
        type:Number,
        required:[ true, 'Please enter the product price']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    rating:{
         type:Number,
         default: 4.5
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message:'{VALUE} is not supported'
        }
    },
    featured:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model('Products', productSchema)