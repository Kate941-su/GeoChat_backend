const express = require("express");
const app = express();
const http = require('http');
const { createServer } = require("http");
const  server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000

app.route("/").get((req, res)=>{
    res.json("Hey thre welcome again on dev stack channel !!")
});

/*
@param : connection is predefined.
*/
io.on("connection", (socket) => {
    console.log("【JS】 connect to frontend");
    // You have to synchronize first argument to socketio client.
    socket.on("sendMsg", (data)=> {
        console.log(data);
    })
});


server.listen(port, ()=> {
    console.log(`listen on * : ${port}`);
})