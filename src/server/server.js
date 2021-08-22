import totalProduct from './totalProduct.js';
import totalPerUser from './totalPerUser.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from "express";
import crypto from 'crypto';

const app = express();
const port = 8080;

//app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function generateAuthToken() {
  return crypto.randomBytes(30).toString('hex');
}

app.post('/login', function (req, res) {
  let user = req.body;
  console.log(user);
  if (user.username == 'a' && user.password == 'a') {
    const authToken = generateAuthToken();
    res.send({ token: authToken });
  }
  else {
    res.send({ token: "" });
  }
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