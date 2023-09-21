const Products = require('../models/product')

const getAllProductsStatic = async (req, res)=>{
    const search = 'ab'
const products = await Products.find({price:{ $gt:30}})
.sort('price')
.select('name price')
// .limit(11)
// .skip(10)
res.status(200).json({products, nbHits:products.length})
}

const createProduct = async(req, res) =>{
    const products = await Products.create(req.body)
    console.log(req.body)
    res.status(201).json({product: products})
  }

  const deleteProduct = async(req, res) =>{
    const {id:productId} = req.params
    const products = await Products.deleteOne({_id:productId})
    console.log(productId)
    if(!products){
        res.status(404).json({msg:`No product with id ${productId}`})
    }
    res.status(200).json({msg:"Deleted successfully"})
  }

const getAllProducts = async (req, res)=>{
    const {featured, company, name, sort, field, numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured=featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    //numericFilters
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq'
        }
        const regEx = /\b(<|>|=|>=|<=)\b/g
        let filters = numericFilters.replace(
            regEx, 
            (match)=>`-${operatorMap[match]}-`
        )

        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value) }
            }
        }); // console.log(filters)
    }
    console.log(queryObject)
    let result =  Products.find(queryObject)
    
    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        //console.log(sort)
    }else{
        result = result.sort('createdAt')
    }

    //fields
    if(field){
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }

    

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 30
    const skip = Number((page - 1) * limit)
    result.skip(skip).limit(limit)


    const products = await result
    //console.log(req.query)
    res.status(200).json({products, nbHits:products.length})
    }

    module.exports={
        getAllProductsStatic,
        getAllProducts,
        createProduct,
        deleteProduct
    }