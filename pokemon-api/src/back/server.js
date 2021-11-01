// libaries
const express = require('express');
const cors = require('cors');
const path = require("path");
// routers
const pokemonRoute = require('./routers/pokemonRouter');
const userRoute = require('./routers/userRouter')
// my files
const errorHandler = require('./middleware/errorHandler');
// others
const app = express();
const port = 8080;

// start the server
app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));


app.use(cors());
app.use('/info', userRoute);
app.use('/pokemon', pokemonRoute);
app.use('/', express.static(path.resolve('../'))); // serve main path as static dir
app.get('/', function (req, res) { // serve main path as static file
  res.sendFile(path.resolve('../index.html'))
});
app.use(errorHandler);