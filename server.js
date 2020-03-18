const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const server = require("./routes/server");
const channel = require("./routes/channel");
const path = require("path");
const app = express();
const db = require("./config/keys").mongoURI;

//const servers = []

mongoose.set("useFindAndModify", false);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/user", user);
app.use("/server", server);
app.use("/channel", channel);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

const socketServer = app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

const io = socket(socketServer);

io.on("connection", socket => {
  console.log(`${socket.id} connected`);
  socket.on("startChat", data => {
    socket.join(data.conversationID);
  });

  socket.on("sendMessage", data => {
    io.sockets
      .in(data.conversationID)
      .emit("newMessage", { message: data.message });
  });

  socket.on("endChat", data => {
    socket.leave(data.conversationID);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
