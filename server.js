const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const hello_msg = '<h1> Hello from Node on Fly.io!</h1>';

app.get('/', (_, res) => {
  res.send(hello_msg);
});

app.get('/:name', (req, res) => {
  const name = req.params['name'];
  const greeting = `${hello_msg}<br>And, hello to ${name}!!`;

  res.send(greeting);
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`HelloNode app listerning on port ${port}`)
});
