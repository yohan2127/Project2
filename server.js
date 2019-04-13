require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");

// === dependencies for user authentication ===
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
// =============================================

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// For Passport
app.use(cookieParser());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require("./config/passport/passport.js")(passport, db.user);

// Routes
require("./routes/authRoutes.js")(app, passport, db.user);
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);
require("./routes/api-routes.js")(app, passport, db.user);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
