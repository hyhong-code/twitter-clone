const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const errorHandler = require("./controllers/errorController");

// ROUTERS
const userRouter = require("./routes/userRouter");
const tweetRouter = require("./routes/tweetRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

// MIDDLESWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("hello");
});

// MOUNT ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
