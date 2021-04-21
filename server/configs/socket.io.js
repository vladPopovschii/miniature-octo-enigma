const Message = require("../models/message");
const Chatroom = require("../models/chatroom");

// Socket.io configuration

function configureSocket(io) {
    const users = {};

    io.use((socket, next) => {
        const userId = socket.handshake.query.auth;
        socket.userId = userId;
        users[userId] = socket.id;
        next();
    });

    io.on("connection", (socket) => {
        socket.on("send-message", async (roomId, receiverId, message) => {
            try {
                const messageDoc = new Message({
                    user: socket.userId,
                    body: message,
                });
                await Chatroom.findByIdAndUpdate(roomId, {
                    $push: {
                        messages: messageDoc,
                    },
                });
                await messageDoc.save();
                socket.broadcast
                    .to(users[receiverId])
                    .emit("receive-message", messageDoc, socket.userId);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("disconnected", () => {
            delete users[socket[socket.userId]];
        });
    });
}

module.exports = configureSocket;
