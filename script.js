const express = require("express"); //Import Express
const Joi = require("joi"); // Import Joi

const app = express(); //Create Express Application on the app variable
app.use(express.json()); //Used the json file

//PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
