const cors = require("cors");
const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

const getUser = (userId) => {
    return users.find((user)=>user.userId === userId)
}

io.on("connection",(socket)=>{
    //when connect
    console.log(`user connected ${socket.id}`)
    io.emit("welcome","hello,this is server")

    //添加在线用户
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users)
    })

    //发送信息给指定用户
    socket.on("sendMessage",({senderId,recieverId,text})=>{
        reciever = getUser(recieverId)
        io.to(reciever.socketId).emit("getMessage",{senderId,text})
    })

    //加入群聊房间
    socket.on("joinedRoom",({roomId})=>{
        socket.join(roomId)
        console.log(`User with Id : ${socket.id} joined Room-${roomId}`);
    })

    //接受群聊信息并转发到相应房间
    socket.on("sendGroupMessage",({senderId,groupId,text})=>{
        console.log(text)
        io.to(groupId).emit("recieveMessage",{senderId,text})
        console.log(text)
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log(`a user disconnected!${socket.id}`);
        removeUser(socket.id);
        io.emit("getUsers", users);
  });
})