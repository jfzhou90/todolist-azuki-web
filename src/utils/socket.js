import Socket from 'socket.io-client';

export default id => {
  const socket = Socket();
  socket.on('connect', () => socket.emit('join', `${id}`));
  return socket;
};
