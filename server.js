const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({ path: 'server.env'})
const accountRoute = require('./routes/account-route')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api',accountRoute)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server at http://localhost:${port}/`)
})