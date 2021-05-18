const http = require('http')
const { getProducts } = require('./controllers/productController')

// root route: /api/products/
const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
    console.log('response: 200. at GET: root/api/products')
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: '404. Route Not Found. Try api home at: `/api/products`...' }))
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => { console.log(`Server listening on Port: ${PORT} !`) })
