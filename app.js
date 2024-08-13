const express = require("express");
const app = express();

const http = require("http");
const path = require("path");
const socketServer = require("socket.io");
const server = http.createServer(app);
const io = socketServer(server);

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });

  console.log("connected");
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(6202, function () {
  console.log("server is running on that port", 6202);
});
