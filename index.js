const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require ("dotenv");
const cors = require("cors")


// make connection to MongoDB database
require("./src/db/db");

const app = express();
const http = require('http').Server(app)
// const server = http.createServer(app)

dotenv.config({path:'.env'})
const PORT = process.env.PORT||8080

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('public'));
app.get("/", (req, res) => { res.json(`Nothing to show`) });



http.listen(PORT, () => { console.log(`server is running on http://localhost:${PORT}`) });
app.use(express.static(__dirname + "/public"));


//routes
app.use('/', require('./src/routes/routes'))