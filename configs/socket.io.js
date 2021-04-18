// Socket.io configuration

function configureSocket(io) {
    io.use((socket, next) => {
        const userId = socket.handshake.auth.id;
        console.log("socket.io middlewaew");
        socket.userId = userId || "someafiubn";
        next();
    });

    io.on("connection", (socket) => {
        console.log("User connected" + socket.id + " " + socket.userId);

        socket.on("send-message", (receiverId, text) => {
            socket.broadcast
                .to(receiverId)
                .emit("receive-message", text, socket.userId);
        });

        socket.on("disconnected", () => {
            console.log("User disconnected!");
        });
    });
}

module.exports = configureSocket;
