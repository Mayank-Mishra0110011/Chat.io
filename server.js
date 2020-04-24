const express = require("express");
const axios = require("axios");
const keys = require("./config/keys");
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
  .catch((err) => {
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

const users = {};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      users[socket.id].servers.forEach((server) => {
        socket.to(server).emit("userOffline", {
          user: users[socket.id].userID,
          server: server,
        });
      });
      axios
        .post("http://localhost:5000/user/private/offline", {
          secretKey: keys.secretKey,
          id: users[socket.id].userID,
        })
        .then(() => {
          delete users[socket.id];
        });
    }
  });
  socket.on("joinServer", (data) => {
    const { servers, user } = { ...data };
    if (!users[socket.id])
      users[socket.id] = { userID: user, servers: servers };
    servers.forEach((server) => {
      socket.join(server);
      socket.to(server).emit("joinServer", {
        user: user,
        server: server,
      });
    });
    socket.emit("joinSuccess");
  });
  socket.on("online", (data) => {
    const { servers, user } = { ...data };
    if (!users[socket.id])
      users[socket.id] = { userID: user, servers: servers };
    servers.forEach((server) => {
      socket.join(server);
      socket.to(server).emit("userOnline", {
        user: user,
        server: server,
      });
    });
  });
  socket.on("offline", (data, callback) => {
    const { servers, user } = { ...data };
    if (!users[socket.id])
      users[socket.id] = { userID: user, servers: servers };
    servers.forEach((server) => {
      socket.join(server);
      socket.to(server).emit("userOffline", {
        user: user,
        server: server,
      });
    });
    if (callback) callback("sucesss");
  });
  socket.on("busy", (data) => {
    const { servers, user } = { ...data };
    if (!users[socket.id])
      users[socket.id] = { userID: user, servers: servers };
    servers.forEach((server) => {
      socket.join(server);
      socket.to(server).emit("userBusy", {
        user: user,
        server: server,
      });
    });
  });
  socket.on("dnd", (data) => {
    const { servers, user } = { ...data };
    if (!users[socket.id])
      users[socket.id] = { userID: user, servers: servers };
    servers.forEach((server) => {
      socket.join(server);
      socket.to(server).emit("userDnd", {
        user: user,
        server: server,
      });
    });
  });
  socket.on("message", (data) => {
    const { serverID, userID, message } = { ...data };
    socket.to(serverID).broadcast.emit("chatMessage", {
      message: message,
      user: userID,
    });
  });
});
