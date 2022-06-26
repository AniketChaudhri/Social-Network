const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const port = process.env.PORT || 8080

// api docs
app.use('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data)=>{
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        res.json(JSON.parse(data))

    })
})

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator())
app.use(cors());

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);


app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({error: "Unauthorised!"});
    } else {
        next(err);
    }
});




dotenv.config()

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => console.log(`DB connection error: ${err.message}`));


app.listen(port, () => {console.log(`Listening on port ${port}`)});