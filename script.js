const express = require("express"); //Import Express
const Joi = require("joi"); // Import Joi

const app = express(); //Create Express Application on the app variable
app.use(express.json()); //Used the json file

//Give data to the server
const customers = [
  { title: "Dilu", id: 1 },
  { title: "Snada", id: 2 },
  { title: "Chari", id: 3 },
  { title: "Nilakshi", id: 4 },
  { title: "Ravi", id: 5 },
];

//PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
