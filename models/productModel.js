const products = require('../data/products')

function findAll() {
  return new Promise(() => {
    resolve(products)
  })

}

module.exports = {
  findAll
}
