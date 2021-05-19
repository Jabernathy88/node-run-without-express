const http = require('http')
const { getProducts, getProductById, createProduct, updateProduct } = require('./controllers/productController')

const server = http.createServer((req, res) => {

  // GET All
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)

  // GET One by :id
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getProductById(req, res, id)

  // POST
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)

  // PUT api/products/:id
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)

  // DELETE

  // root route: /api/products/
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: '404-Route Not Found. Try: `/api/products`' }))
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => { console.log(`Server listening on Port: ${PORT} !`) })
