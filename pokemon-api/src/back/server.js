// libaries
const express = require('express');
var cors = require('cors');
// routers
const pokemonRoute = require('./routers/pokemonRouter');
const userRoute = require('./routers/userRouter')
// my files
const errorHandler = require('./middleware/errorHandler');
// others
const app = express();
const port = process.env.PORT || 8080;;

// start the server
// app.listen(port, function () {
//   console.log(`listing to port ${port}`);
// });

app.use(cors());
// app.use('/', express.static(path.resolve('../dist'))); // serve main path as static dir
// app.get('/', function (req, res) { // serve main path as static file
//   res.sendFile(path.resolve('../dist/index.html'))
// });
app.use('/info', userRoute);
app.use('/', pokemonRoute);
app.use(errorHandler);
app.listen(port,
  () => console.log("Server is running..."));