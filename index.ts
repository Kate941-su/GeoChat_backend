import { MessageRepositoryImpl } from "./mocked_repository/message_repository_impl";

const express = require("express");
const app = express();
const http = require("http");
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port: number = 3000;

const messageRepository = new MessageRepositoryImpl();

app.route("/").get((req, res) => {
  res.json("Hey thre welcome again on dev stack channel !!");
});

/*
@param : connection is predefined.
*/
io.on("connection", (socket) => {
  // Specifing room name by defining join argument.
  /// TODO : Honesty, join name is conversaion room id (uuid string).
  console.log("【JS】 connect to frontend");
  // You have to synchronize first argument to socketio client.
  socket.on("sendMsg", (message) => {
    // send message only much "io.to() room"
    socket.join("sample_room");
    console.log("From Server Message", { ...message, type: "otherMsg" });
    // "'dummy_room' is to specify room id. "
    io.emit(message.roomId, {
      ...message,
      type: "otherMsg",
    });
    messageRepository.addMessage(message);
  });
});

io.on("disconnect", (socket) => {
  console.log(socket.id);
});

server.listen(port, () => {
  console.log(`listen on * : ${port}`);
});
