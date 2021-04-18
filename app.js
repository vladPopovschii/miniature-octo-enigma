const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Using ejs template to create dinamic pages for testing
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));

// routers

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/api", apiRouter);

// Error handler middleware
const errorHandlerMiddleware = require("./middleware/errorHandler");
app.use(errorHandlerMiddleware);

module.exports = app;
