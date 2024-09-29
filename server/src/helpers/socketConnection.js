const socketConnection = (io) => {

  // when user connects (connection event)
  io.on("connection", (socket) => {
    // console.log("User is running");
    // console.log(socket);

    // when user disconnects (disconnection event)
    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
  })

}

export { socketConnection };