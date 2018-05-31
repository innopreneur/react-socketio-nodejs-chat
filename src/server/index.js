let server = require("http").createServer();
var io = require("socket.io")(server);
let socketManager = require("./socketManager");

const PORT = process.env.PORT || 3301;

//when new client connects
io.on("connection", socketManager);

server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})

module.exports.io = io;