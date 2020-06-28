const connectSocket = (io) => {
  console.log(`Socket io connected...`);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("message", ({ name, text, date }) => {
      console.log(name, text, date);
      io.emit("message", { name, text, date });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
};

module.exports = connectSocket;
