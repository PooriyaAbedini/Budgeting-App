const express = require('express')
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const cookies = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const colors = require('colors');
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
const port = process.env.PORT;

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookies())

app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/items', require('./routes/itemsRoute'));
app.use('/api/expenses', require('./routes/expensesRoute'));
app.use('/api/chartdata', require('./routes/chartDataRoute'));

app.use(errorHandler)

app.listen(port, (err) => {
    if(err) {
        console.log(`Error: ${err}`.red)
    }
    else {
        console.log(`Server is running on port: ${port}`.cyan.underline)
    }
});