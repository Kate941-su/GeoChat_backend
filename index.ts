const express = require("express");
const app = express();
const http = require('http');
const { createServer } = require("http");
const  server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port: number = 3000

app.route("/").get((req, res)=>{
    res.json("Hey thre welcome again on dev stack channel !!")
});

/*
@param : connection is predefined.
*/
io.on("connection", (socket) => {
    // Specifing room name by defining join argument.
    /// TODO : Honesty, join name is conversaion room id (uuid string).    
    console.log("【JS】 connect to frontend");
    // You have to synchronize first argument to socketio client.
    socket.on("sendMsg", (msg)=> {
        // send message only much "io.to() room"
        socket.join('sample_room');
        console.log("msg", msg, {...msg, type:"otherMsg"});
        io.to("sample_room").emit("sendMsgServer",{...msg, type: "otherMsg"});
    });
});


server.listen(port, ()=> {
    console.log(`listen on * : ${port}`);
})