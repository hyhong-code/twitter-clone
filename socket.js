let CONNECTED_USER = [];

const connectSocket = (io) => {
  const CHAT_BOT = "$chat$admin";
  const ROOM_PREFIX = "$room$";

  console.log(`Socket.io connected...`);

  // RUN WHEN A NEW CLIENT CONNECTS
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userConnected", (handle) => {
      // PUSH USER INTO CONNECTED USER LIST
      CONNECTED_USER.push({
        handle,
        socketId: socket.id,
      });
      console.log(CONNECTED_USER);
    });

    // // EMIT TO THIS SOCKET
    // socket.emit("message", {
    //   name: CHAT_BOT,
    //   text: "Welcome to the chat!",
    //   date: new Date(Date.now()),
    // });

    // // BROADCASE TO ALL EXCEPT FOR THIS SOCKET
    // socket.broadcast.emit("message", {
    //   name: CHAT_BOT,
    //   text: "A user has joined",
    //   date: new Date(Date.now()),
    // });

    // // RUNS WHEN SERVER RECEIVES A MESSAGE
    // socket.on("message", ({ name, text, date }) => {
    //   // EMIT TO ALL SOCKETS
    //   io.emit("message", { name, text, date });
    // });

    // RUNS WHEN CLIENT DISCONNECTS
    socket.on("disconnect", () => {
      console.log("a user disconnected");

      // PULL USER OUT FROM CONNECTED USER LIST
      CONNECTED_USER = CONNECTED_USER.filter(
        (user) => user.socketId !== socket.id
      );
      console.log(CONNECTED_USER);

      // io.emit("message", {
      //   name: CHAT_BOT,
      //   text: "A user has left the chat",
      //   date: new Date(Date.now()),
      // });
    });
  });
};

/*
[0] {
[0]   '2lldnIkKGnL8V7gzAAAA': Room { sockets: { '2lldnIkKGnL8V7gzAAAA': true }, length: 1 },
[0]   room1: Room {
[0]     sockets: { '2lldnIkKGnL8V7gzAAAA': true, RuvTXGfhpYxzsW06AAAB: true },
[0]     length: 2
[0]   },
[0]   RuvTXGfhpYxzsW06AAAB: Room { sockets: { RuvTXGfhpYxzsW06AAAB: true }, length: 1 },
[0]   NiVbMvEHsk2TT4UTAAAC: Room { sockets: { NiVbMvEHsk2TT4UTAAAC: true }, length: 1 }
[0] }

*/

module.exports = connectSocket;
