const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello World!"));

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

module.exports = app;
