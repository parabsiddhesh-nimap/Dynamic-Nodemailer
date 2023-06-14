const express = require("express");
const sendEmail = require("./controller/dynamic_mail");
const fileUpload = require("./controller/uploadFile");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({message : "Hello World!"});
})

app.post("/mailSender",fileUpload,sendEmail)

app.listen(PORT,(err) => {
    if(err) console.log(err);
    console.log(`Successfully listening on http://localhost:${PORT}`)
})