require("dotenv").config({ path: `${__dirname}/config/config.env` });
const connectDB = require("./config/db");
// PREVENT UNCAUGHTEXCEPTIONS GLOBALLY
process.on("uncaughtException", (err) => {
  console.log(`Caught uncaught exception! server shutting down...`);
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const connectSocket = require("./socket");

connectDB();
connectSocket(io);

const port = process.env.PORT || 5000;
http.listen(
  port,
  console.log(
    `Server running on port ${port} in ${process.env.NODE_ENV} mode...`
  )
);

// PREVENT UNHANDLEDREJECTIONS GLOBALLY
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log(`Caught unhandled rejection! server shutting down...`);

  // FINISH PENDING REQUESTS BEFORE CLOSING DOWN
  server.close(() => process.exit(1));
});
