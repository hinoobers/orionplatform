const { Server } = require("socket.io");
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});

function sendUpdatePacket() {
    io.emit("message", "update");
}

module.exports = {
    sendUpdatePacket
}