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

//Read Request Handlers
//Display the message when the URL consists of '/'
app.get(`/`, (req, res) => {
  res.send("Welcome to REST API!");
});

//Display the list of customers when URL consists of api customers
app.get(`/api/customers`, (req, res) => {
  res.send(customers);
});

//Display the Information of specific customer when you mentioned the id
app.get(`/api/customers/:id`, (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  //if there is no valid customer ID , then display an error with the following
  if (!customer)
    res
      .status(404)
      .send(
        `<h2 style="font-family:Malgun Gothic; color:darked; ">Ooops... Cant find what you are looking for!</h2>`
      );
  res.send(customer);
});

//Create REquest Handler
//Create new customer information
app.post(`/api/customers`, (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //Increment the customer id
  const customer = {
    id: customers.length + 1,
    title: req.body.title,
  };
  customers.push(customer);
  res.send(customer);
});

//Update Requesrt Handler
//Update Existing Customer information
app.put(`/api/customers/:id`, (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res
      .status(404)
      .send(
        '<h2 style="font-family:Malgun Gothic; color:darked;">Not FOund!</h2>'
      );

  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  customer.title = req.body.title;
  res.send(customer);
});

//Delete Request Handler
//Delete customer details
app.delete(`/api/customers/:id`, (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color:darked;">Not Found!</h2>'
      );

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});

//Validation Information
function validateCustomer(customer) {
  const schema = {
    title: Joi.string().min(3).required(),
  };
  return Joi.validate(customer, schema);
}

//PORT environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
