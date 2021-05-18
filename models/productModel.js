const products = require('../data/products')

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

function findById() {
  return new Promise(() => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  }) 
}

module.exports = {
  findAll,
  findById
}
