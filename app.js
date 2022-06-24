const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');
const port = process.env.PORT || 8080

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator())
app.use('/', postRoutes);


dotenv.config()

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});