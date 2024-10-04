const socketConnection = (io) => {

  // when user connects (connection event)
  io.on("connection", (socket) => {
    socket.on("join-room", (room) => {
      socket.join(room);
    })

    socket.on("message", (room, msg) => {
      io.to(room).emit("message", msg);
    })
  })
}

export { socketConnection };