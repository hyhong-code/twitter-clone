const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const errorHandler = require("./controllers/errorController");

// ROUTERS
const userRouter = require("./routes/userRouter");
const tweetRouter = require("./routes/tweetRouter");
const commentRouter = require("./routes/commentRouter");
const profileRouter = require("./routes/profileRouter");

const app = express();

// MIDDLESWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(fileUpload());

// MOUNT ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/profile", profileRouter);

// SERVE STATIC FILES IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
