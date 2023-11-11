'use client';

import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

const URL = 'http://143.167.68.112:696/';

export default function Home() {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  const [clientId, setClientId] = useState();
  const [username, setUsername] = useState('Kush');

  function emitUsernameToServer(e) {
    e.preventDefault()
    if (!socket) {
      console.error('Socket not connected')
      return
    }

    socket.emit('create-player', { clientId: clientId, username: username })
  }

  function emitCreateParty(e) {
    if (!socket) {
      console.error('Socket not connected')
      return
    }
    if (!clientId) {
      console.error('Client ID not set')
      return
    }

    socket.emit('create-party', { partyLeader: clientId })
  }

  useEffect(() => {
    const _socket = io(URL);
    setSocket(_socket)

    function onConnect() {
      setIsConnected(true);
      console.log(`Connected to server, client id: ${_socket.id}`);
      setClientId(_socket.id);
    }

    function onDisconnect() {
      console.log('Disconnected from server');
      setIsConnected(false);
      setClientId(null);
    }

    function onError(data) {
      console.error(data)
    }

    _socket.on('connect', onConnect);
    _socket.on('disconnect', onDisconnect);
    _socket.on('error', onError);

    return () => {
      _socket.off('connect', onConnect);
      _socket.off('disconnect', onDisconnect);
      _socket.off('error', onError);
      _socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={emitUsernameToServer}>
        <label>
          Enter your name:
          <input
            className="text-black"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      {/* {chats.forEach(element => {
        <p>{element}</p>
      })} */}
    </main>
  );
}
