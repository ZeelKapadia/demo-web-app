const _express = require("express");
const _mongoose = require("mongoose");
const _morgan = require("morgan");
const body_parser = require("body-parser");
const status_codes = require('http-status-codes').StatusCodes;
const reason_phrases = require('http-status-codes').ReasonPhrases;
const cors = require('cors');

// for generating the swagger doc
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require('./Documentation/Swagger.json');

// Extended:https://swagger.io/specification/#infoObject
const swaggerOption = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Demo Apis(Only for testing purpose)",
            description: "this api is only for testing purposes only and made with nodejs and mongodb with mongoose",
            contact: {
                name: "Zeel Kapadia"
            },
        },
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'http',
                    scheme: 'bearer',
                }
            }
        },
        servers: [{
            url: "http://192.168.29.128:4000"
        }],
    },
    apis: ["./routes/*"]
}

const swaggerDocs = swaggerJsDoc(swaggerOption);


// for another purpose
const dotenv = require("dotenv");
dotenv.config()

const authRoute = require("./routes/authRoute");
const empRouter = require("./routes/employeeRoute");

_mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })

const db = _mongoose.connection

db.on("error", (err) => {
    console.log(err);
})

db.once("open", () => {
    console.log("db connection established!");
})

const app = _express()
app.use(cors())

app.use(_morgan('dev'))
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

// for swagger ui
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use('/new-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// for file uploadation
app.use("/uploads", _express.static("uploads"))

const port = process.env.port || 3000;
const address = process.env.address || 'localhost'

app.listen(port, address, () => {
    console.log(`server is listening to the server: http://${address}:${port}`);
});

app.use('/api', authRoute);

app.use('/api/employee', empRouter);

app.use('**', (req, res) => {
    res.status(status_codes.NOT_FOUND).json({
        message: "path doesnt found",
        reason: reason_phrases.NOT_FOUND
    })
});

app.use("/", (req, res) => {
    res.status(status_codes.BAD_REQUEST).json({
        reason: "You may trying to access the wrong URL"
    })
})


// http://localhost:3000/api-doc
// http://192.168.29.128:4000/api-doc/