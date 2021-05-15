const Products = require('../models/productModel')
// more
async function getProducts(req, res) {
  try {
    const products = await Products.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts
}
