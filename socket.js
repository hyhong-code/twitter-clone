let CONNECTED_USERS = [];
const CHAT_BOT = "$chat$admin";

const connectSocket = (io) => {
  console.log(`Socket.io connected...`);

  // RUN WHEN A NEW CLIENT CONNECTS
  io.on("connection", (socket) => {
    console.log("a user connected");
    let chatTarget;

    // HANDLE TRACKING ONLINE USERS
    socket.on("userConnected", (userId) => {
      // PUSH USER INTO linline USER LIST
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
    });

    // HANDLE STARITING A CHAT SESSION
    socket.on("startChat", ({ selfId, targetId, targetHandle }) => {
      // SET CHAT TARGET
      chatTarget = CONNECTED_USERS.find((user) => user.userId === targetId)
        .socketId;

      // SEND WELCOME MESSAGE
      socket.emit("message", {
        name: CHAT_BOT,
        text: `You are chatting with @${targetHandle}`,
        date: new Date(Date.now()),
      });
    });

    // HANDLE RECEIVING AND SENDING MESSAGE
    socket.on("message", ({ name, text }) => {
      console.log(chatTarget);
      const msg = {
        name,
        text,
        date: new Date(Date.now()),
      };

      // TO SELF
      socket.emit("message", msg);

      // TO TARGET
      io.to(chatTarget).emit("message", msg);
    });

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
    });
  });
};

module.exports = connectSocket;
