const express = require("express");
const app = express();
const { auth } = require("./middleware/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
    require("cors")({
        credentials: true,
    })
);
app.use(require("./middleware/controlOrigin"));

// Using ejs template to create dinamic pages for testing
app.set("view engine", "ejs");

app.get("/", auth, (req, res) => res.json({ message: "home" }));

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
app.use("/users", auth, usersRouter);
app.use("/posts", auth, postsRouter);
app.use("/api", apiRouter);

// Error handler middleware
const errorHandlerMiddleware = require("./middleware/errorHandler");
app.use(errorHandlerMiddleware);

module.exports = app;
