// Socket.io configuration

function configureSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("disconnected", () => {
            console.log("User disconnected!");
        });
    });
}

module.exports = configureSocket;
