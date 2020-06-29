const connectSocket = (io) => {
  console.log(`Socket.io connected...`);

  // RUN WHEN A NEW CLIENT CONNECTS
  io.on("connection", (socket) => {
    console.log("a user connected");

    // EMIT TO THIS SOCKET
    socket.emit("message", {
      name: "$chat$admin",
      text: "Welcome to the chat!",
      date: new Date(Date.now()),
    });

    // BROADCASE TO ALL EXCEPT FOR THIS SOCKET
    socket.broadcast.emit("message", {
      name: "$chat$admin",
      text: "A user has joined",
      date: new Date(Date.now()),
    });

    // RUNS WHEN SERVER RECEIVES A MESSAGE
    socket.on("message", ({ name, text, date }) => {
      // EMIT TO ALL SOCKETS
      io.emit("message", { name, text, date });
    });

    // RUNS WHEN CLIENT DISCONNECTS
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      io.emit("message", {
        name: "$chat$admin",
        text: "A user has left the chat",
        date: new Date(Date.now()),
      });
    });
  });
};

module.exports = connectSocket;
