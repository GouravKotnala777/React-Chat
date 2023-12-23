const app = require("./app");
// const express = require("express");
// const app = express();
const PORT = 8000;
const {database} = require("./config/database");
const http = require("http");
const socketIO = require("socket.io");
const users = [{}];

database();

app.get("/", (req, res) => {
    res.json({data:"this is it"});
});


const server = http.createServer(app);
// const io = socketIO(server);
// console.log("=============================");
// io.on("connection", (socket) => {
//     console.log("New Connection from Server....");

    
    // socket.on("joined", (userData) => {
    //     users[socket.id] = userData.userId;
    //     console.log({joined:userData.userId});

    //     // socket.emit("welcome", {user:`${users[socket.id]}`, message:`welcome to the chat ${users[socket.id]}`});
    //     socket.broadcast.emit("welcomeall", {userId:userData.userId, userSocketId:`${socket.id}`, message:`${userData.userName} has joined`})
    // });
    

    // socket.on("message", ({message, id}) => {
    //     console.log({message:{message, id}});
    //     io.emit("sendMessageIO", {user:users[id], message, id});
    // });

//     socket.on("disconnect", () => {
//         console.log("User Left");
//     })
    
// })



server.listen(PORT, () => {
    console.log("listening.....");
})