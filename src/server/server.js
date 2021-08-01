import totalProduct from './totalProduct.js';
import totalPerUser from './totalPerUser.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from "express";

const app = express();
const port = 8080;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', function (req, res) {
  const body = req.body;
  console.log(body);
  res.send("Login success.");
});

app.post('/totalProduct', async function (req, res) {
  const fromRow = req.body.fromRow;
  const toRow = req.body.toRow;
  let result = await totalProduct(fromRow, toRow);
  res.send(result);
});

app.post('/totalPerUser', async function (req, res) {
  const fromRow = req.body.fromRow;
  const toRow = req.body.toRow;
  let result = await totalPerUser(fromRow, toRow);
  res.send(result);
});

app.listen(port, () => console.log(`API is running on http://localhost:${port}`));