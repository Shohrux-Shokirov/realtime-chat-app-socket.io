const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} =  require("socket.io")

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  }
})

io.on("connection", (socket)=>{

  //connecting socket.io server
  console.log(`User connected ${socket.id}`);

  //joining to the chat (group)
  socket.on("join_chat", (data) =>{
    socket.join(data);
    console.log(`User with ID ${socket.id} joined chat: ${data}`);
  });

  //sending messages
  socket.on("send_message", (data) =>{
    socket.to(data.chat).emit("recieve_message", data)
  });

  //disconnecting socket.io server
  socket.on("disconnect", ()=>{
    console.log("User disconnected", socket.id);
  })
})

server.listen(3001, () => {
  console.log("SERVER RUNNING");
})