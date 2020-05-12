const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getUser = (request, response) => {
    pool.query('SELECT * FROM User', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/user')
    // GET endpoint
    //.get(getUser())
    // POST endpoint
    /*.post(addBook)*/

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})
