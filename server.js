const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config({ path: 'server.env'})
const path = require('path')
const accountRoute = require('./routes/account-route')
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/asset', express.static(path.join(__dirname, 'asset')))
app.use('/api',accountRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server at http://localhost:${port}/`)
})