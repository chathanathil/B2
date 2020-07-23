const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const Chat = require("./models/Chat");

const User = require("./routes/users");
const Company = require("./routes/company");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  socket.on("sendMessage", (msg) => {
    let chat = new Chat({
      message: msg.message,
      sender: msg.sender,
      receiver: msg.receiver,
    });
    chat.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      io.to(msg.reciever).emit("message", msg);
    });
  });
});

app.use("/api/users", User);
app.use("/api/company", Company);

app.use(cors());

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
