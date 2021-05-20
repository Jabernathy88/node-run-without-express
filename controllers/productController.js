const Product = require('../models/productModel')

const { getPostData } = require('../utils')


// GET All: /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))

  } catch (error) {
    console.log(error)
  }
}

// GET One: GET /api/product/:id
async function getProductById(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: '404. Record Not Found.' } ))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// POST: /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body) // convert user input params from raw request, then destructure part of the object and save to variable

    const product = {
      title,
      description,
      price
    }

    const newProduct = await Product.create(product) // newProduct object returned here by *resolve() statement, comes back after Promise resolves

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))

  } catch (error) {
    console.log(error)
  }
}

// PUT api/products
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    // First select record by :id
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: '404. Record Not Found.' } ))

    // Then grab user input from request and update the selected record
    } else {
      const body = await getPostData(req)

      const { title, description, price } = JSON.parse(body) // convert user input params from raw request, then destructure part of the object and save to variable
  
      const productParams = {
        title: title || product.title, // allows for null case, request does not have new title
        description: description || product.description,
        price: price || product.price
      }
  
      const updatedProduct = await Product.update(id, productParams) // updated JS object returns from Promise's resolve() statement

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updatedProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
}
