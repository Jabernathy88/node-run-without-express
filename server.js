const http = require('http')
// more 
const server = http.createServer((req, res) => {
  console.log("GET ROOT!")
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.write('<h2>Yolo World.<h2>')
  res.end()
})

const PORT = process.env.PORT || 2021

server.listen(PORT, () => { console.log('Server listening on Port: ', PORT) })
