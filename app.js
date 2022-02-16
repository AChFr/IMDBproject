// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local


app.locals.title = "IMDBproject";

// Session config
require('./config/session.config')(app)

// 👇 Start handling routes here

const index = require("./routes/route.index");
app.use("/", index);

const auth = require("./routes/auth.routes")
app.use("/", auth)

const user = require("./routes/user.routes")
app.use("/", user)

const movieApi = require("./routes/api.routes")
app.use(`/https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_KEY}`, movieApi)




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
