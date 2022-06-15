const express = require('express');
const bodyParser = require('body-parser');                //body-parser help to get access of data which send by user in body
const app = express();
require('dotenv').config;                                // to access env file

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {                    // process.env.PORT  using process we select .env file and then we select PORT
    console.log("Server Started")
})