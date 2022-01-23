const  express = require('express') 
const  { createProxyMiddleware } = require('http-proxy-middleware') 


const dotenv = require('dotenv') 
const path = require('path') 
const app = express()
dotenv.config()

const apiProxyTarget = process.env.API_PROXY_TARGET;



app.use(express.static('dist'));
app.use(createProxyMiddleware("/api", { target: apiProxyTarget, changeOrigin: true }));
app.get('*', (req, res, next) => {
   
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || 9000
app.listen(port, function() {
    console.log(`UI started on port ${port}` )
})