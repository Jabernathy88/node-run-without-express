let products = require('../data/products') // products mutated only in Model.destroy method
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = {id: uuidv4(), ...product}
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct) // works like an explicity *return statement?
  }) 
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = {id, ...product}
    writeDataToFile('./data/products.json', products)
    resolve(products[index]) // returns the specific record from array of JSON objects
  })
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id)

    writeDataToFile('./data/products.json', products) // this strategy rewrites whole JSON file. not preferred with real DB.
    resolve(products) // returns the specific record from array of JSON objects
  })
}

module.exports = { // called as: Product.[function name]
  findAll,
  findById,
  create,
  update,
  destroy // OK if *not explicitly exported?
}
