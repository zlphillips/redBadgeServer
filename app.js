require('dotenv').config();
const Express = require('express');
const app = Express();
const db = require('./db');


// Import middlewares as a bundle
//const middlewares = require("./middlewares");

// Import controllers as a bundle
//const controllers = require("./controllers");

app.use(Express.json());

app.use(require('./middleware/headers'));

// Base route to show that the app is working
app.get("/", (req, res) => {
  res.json({
    message: "Four oh four base endpoint is functional :)",
  });
});

// Startup procedure
// Sequelize will attempt to connect via the authenticate method
// It will then synchronize the models with the database.
// After the previous processes have successfully completed, the app will mount to the localhost socket
db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(8080, () => {
      console.log(`[server]: App is listening on localhost:8080`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
