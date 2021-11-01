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

// start the server
app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));


app.use(express.static(path.join(__dirname, '../../dist')))
app.get('/', function (req, res) {
  res.sendFile(path.resolve('../index.html'))  // res.send("hello")
});
app.use(cors());
app.use('/info', userRoute);
app.use('/pokemon', pokemonRoute);
app.use(errorHandler);