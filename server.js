// libaries
const express = require('express');
var cors = require('cors');
// routers
const pokemonRoute = require('./pokemon-api/src/back/routers/pokemonRouter');
const userRoute = require('./pokemon-api/src/back/routers/userRouter')
// my files
const errorHandler = require('./pokemon-api/src/back/middleware/errorHandler');
// others
const app = express();
const port = 8080;

// start the server
app.listen(port, function () {
  console.log(`listing to port ${port}`);
});
app.use(cors());
app.use('/info', userRoute);
app.use('/', pokemonRoute);
app.use(errorHandler);