const express = require("express")
const cors = require("cors")
const body = require("body-parser")
const env = require("dotenv").config();
// const {db} = require("./config/db")
const helmet = require("helmet");
const morgan = require("morgan")
const cookie = require("cookie-parser");
const {errormiddleware} = require("./middlewares/error")
const app = express();



app.use(express.urlencoded({extended:false}));
//middleware
app.use(cors());
app.use(cookie());
app.use(helmet());
app.use(morgan("dev"));
app.use(body.json()) ;

const db = require("./config/db")

app.use(express.json(express.urlencoded))


//route for user
app.use("/api/user/v1", require("./routes/userroute"));

//product route
app.use("/api/product/v2", require("./routes/producroute"));

//order route
app.use("/api/order/v1", require("./routes/orderroute"))


app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on http://localhost: ${process.env.PORT}`)
})



app.use(errormiddleware)