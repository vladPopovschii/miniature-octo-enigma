if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = require("./app");
const server = require("http").createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// Using WebSockets (socket.io)

const io = require("socket.io")(server, {
    // cors: {
    //     origin: "httpl://localhost:8080",
    //     methods: ["GET", "POST"],
    //     credentials: true,
    // },
});
const configureSocket = require("./configs/socket.io");
configureSocket(io);

// Connection to database

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error(error);
});
db.once("open", () => {
    console.log(`Connected to database: ${db.name}`);
});
