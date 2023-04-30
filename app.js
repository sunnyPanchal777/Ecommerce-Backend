const express = require("express")
const cors = require("cors")
const body = require("body-parser")
const env = require("dotenv").config();
// const {db} = require("./config/db")
const cookie = require("cookie-parser");
const {errormiddleware} = require("./middlewares/error")
const app = express();

app.use(cors());
app.use(cookie())
app.use(body.json())
const db = require("./config/db")



//route for user
app.use("/api/user/v1", require("./routes/userroute"));

//product route
app.use("/api/product/v2", require("./routes/producroute"))


app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on http://localhost: ${process.env.PORT}`)
})



app.use(errormiddleware)