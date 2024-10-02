const socketConnection = (io) => {

  // when user connects (connection event)
  io.on("connection", (socket) => {
    socket.join('some room');
    io.to('some room').emit('hello', 'world');
  })
}

export { socketConnection };