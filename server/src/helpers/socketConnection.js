import MessageModel from "../models/MessageModel.js";

const socketConnection = (io) => {
  io.on("connection", (socket) => {
    let roomName;
    socket.on("join-room", (room) => {
      roomName = room;
      socket.join(room);
    })

    socket.on("message", async (room, msg) => {
      io.to(room).emit("message", msg);

      try {
        const MessageDoc = await MessageModel.create({
          room: roomName,
          sender: msg.sender,
          messageValue: msg.messageValue,
          date: msg.date,
          time: msg.time
        });
      }

      catch (err) {
        console.log(err);
      }
    })
  })
}

export { socketConnection };