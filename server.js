require("dotenv").config({ path: `${__dirname}/config/config.env` });
const connectDB = require("./config/db");
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
