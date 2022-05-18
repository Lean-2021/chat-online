const path = require('path');
const express = require('express');
const app = express();
const http= require('http');
const {Server: ioServer} =require('socket.io');
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);
const PORT = process.env.PORT || 8080;


// static files - public
app.use(express.static(path.join(__dirname,'public')));

// webpack

io.on('connection',(socket)=>{
    console.log('Cliente conectado',socket.id);
    socket.on('messageClient',(data)=>{
        io.sockets.emit('messageServer',data);
    });
    socket.on('messageWrite',(data)=>{
        socket.broadcast.emit('messageServerWrite',data);
    })
})

httpServer.listen(PORT,()=>{
    console.log(`Server on port ${PORT}...`)
})

