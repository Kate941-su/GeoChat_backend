var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var express = require("express");
var app = express();
var http = require("http");
var createServer = require("http").createServer;
var server = createServer(app);
var Server = require("socket.io").Server;
var io = new Server(server);
var port = 3000;
app.route("/").get(function (req, res) {
    res.json("Hey thre welcome again on dev stack channel !!");
});
/*
@param : connection is predefined.
*/
io.on("connection", function (socket) {
    // Specifing room name by defining join argument.
    /// TODO : Honesty, join name is conversaion room id (uuid string).
    console.log("【JS】 connect to frontend");
    // You have to synchronize first argument to socketio client.
    socket.on("sendMsg", function (msg) {
        // send message only much "io.to() room"
        socket.join("sample_room");
        console.log("msg", msg, __assign(__assign({}, msg), { type: "otherMsg" }));
        io.to("sample_room").emit("sendMsgServer", __assign(__assign({}, msg), { type: "otherMsg" }));
    });
});
server.listen(port, function () {
    console.log("listen on * : ".concat(port));
});
