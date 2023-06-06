require('dotenv').config()
const responseHelper = require('express-response-helper').helper();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/models');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(responseHelper);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(cookieParser());
// app.use(express.static("app/public"));

//Set app config
const title = process.env.TITLE;
const port = process.env.PORT || 3000;
const baseUrl = process.env.URL + port;

// app.use((req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
//     );
//     // if (req.method === 'OPTIONS') {
//     //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     //     return res.status(200).json({});
//     // }
//     next();
// });

// CORS config
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/router/router.js')(app);

app.listen(port, () => console.log("server run on " + port));