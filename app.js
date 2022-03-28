// npm i dotenv
// env config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Required Stuff
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
// npm i connect-flash
// const flash = require("connect-flash");

// Execute Express
const app = express();
const ExpressError = require("./public/utils/ExpressError");

// port to listen
const port = process.env.PORT || 3000;

// secret
const secret = process.env.SECRET || "myfirstsecret";

// Parse the body to get information
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the views engine to be rendered
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

// Middleware

// Render the static files from public directory
app.use(express.static(path.join(__dirname, "public")));
// Using Mongo Sanitize to prevent the basics security issues
// app.use(mongoSanitize());

// Cookies Config
// const sessionConfig = {
//   store: store,
//   name: "session",
//   secret: secret,
//   resave: false,
//   saveUninitialized: true,
//   // configurando o cookie
//   cookie: {
//     httpOnly: true,
//     // secure: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };

// app.use(session(sessionConfig));
// app.use(flash());

// Flash Messages Config
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// 404 Route in case of access a page that doesn't exists
// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// Listen the Application
app.listen(port, () => {
  console.log(`Landpage Listening on port: ${port}`);
});
