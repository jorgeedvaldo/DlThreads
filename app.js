const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World! ' + req.query.postid);
  });

//starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });