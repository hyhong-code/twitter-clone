const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const errorHandler = require("./controllers/errorController");

// ROUTERS
const userRouter = require("./routes/userRouter");
const tweetRouter = require("./routes/tweetRouter");

const app = express();

// MIDDLESWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

// MOUNT ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);

// GLOBAL ERROR HANDLER
app.use(errorHander);

module.exports = app;
