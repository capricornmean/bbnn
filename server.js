const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.post('/login', function (req, res) {
  if (req.body.username === "a" && req.body.password === "b") {
    res.send({ token: 'ok' });
  }
  else {
    res.send({ token: "fail" });
  }
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));