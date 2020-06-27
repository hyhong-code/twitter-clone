require("dotenv").config({ path: `${__dirname}/config/config.env` });
const connectDB = require("./config/db");
const app = require("./app");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

connectDB();

//
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", ({ name, text, date }) => {
    console.log(name, text, date);
    io.emit("message", { name, text, date });
  });
});

//

const port = process.env.PORT || 5000;
http.listen(
  port,
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode.`)
);
