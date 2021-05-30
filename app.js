var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require('./server/db/config');

var invoiceRoute = require("./server/invoice/route");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// health check
app.get("/", (req, res, next) => {
  const healthcheck = {
    version: process.version, // node version
    // message: "OK",
    timestamp: Date.now(),
  };
  const monitor = {
    app: process.env.npm_package_name,
    appVersion: process.env.npm_package_version,
  };
  try {
    // if (checkHealth())
    healthcheck.message = "OK";
    res.send({ monitor, healthcheck }).status(200);
    // } else {
    //   healthcheck.message = "NOT OK";
    //   res.send({ monitor, healthcheck }).status(500);
    // }
  } catch (e) {
    console.error(e);
    healthcheck.message = e;
    res.status(503).send();
  }
});

app.use("/", invoiceRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
