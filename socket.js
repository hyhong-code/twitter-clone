let CONNECTED_USERS = [];

const CHAT_BOT = "$chat$admin";
const ROOM_PREFIX = "$room$";

const connectSocket = (io) => {
  console.log(`Socket.io connected...`);

  // RUN WHEN A NEW CLIENT CONNECTS
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userConnected", (userId) => {
      // PUSH USER INTO CONNECTED USER LIST
      CONNECTED_USERS.push({
        userId,
        socketId: socket.id,
      });
      console.log(CONNECTED_USERS);

      // HANDLE A NEW USER ONLINE
      socket.broadcast.emit(
        "onlineUsersUpdate",
        CONNECTED_USERS.map((user) => user.userId)
      );
    });

    // HANDLE message PAGE FIRST LOADED
    socket.on("getOnlineUser", () => {
      socket.emit(
        "onlineUsersUpdate",
        CONNECTED_USERS.map((user) => user.userId)
      );
      console.log(
        "server",
        CONNECTED_USERS.map((user) => user.userId)
      );
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
      CONNECTED_USERS = CONNECTED_USERS.filter(
        (user) => user.socketId !== socket.id
      );
      console.log(CONNECTED_USERS);

      // HANDLE A USER LOGOFF
      socket.broadcast.emit(
        "onlineUsersUpdate",
        CONNECTED_USERS.map((user) => user.userId)
      );

      // io.emit("message", {
      //   name: CHAT_BOT,
      //   text: "A user has left the chat",
      //   date: new Date(Date.now()),
      // });
    });
  });
};

module.exports = connectSocket;
