'use client';

import { useEffect, useState } from 'react';

import { CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH } from 'next/dist/shared/lib/constants';
import { Index } from '.';
import { io } from 'socket.io-client';

const URL = 'http://143.167.68.112:696/';

export default function Home() {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [clientId, setClientId] = useState()
  const [username, setUsername] = useState('Kush')
  const [usernameAdded, setUsernameAdded] = useState(false)
  const [party, setParty] = useState(null)

  function emitUsernameToServer(e) {
    e.preventDefault();
    if (!socket) {
      console.error('Socket not connected');
      return;
    }

    socket.emit('create-player', { clientId: clientId, username: username });
  }

  function emitCreateParty() {
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    if (!clientId) {
      console.error('Client ID not set');
      return;
    }

    socket.emit('create-party', { partyLeader: clientId });
  }

  useEffect(() => {
    const _socket = io(URL);
    setSocket(_socket);

    function onConnect() {
      setIsConnected(true);
      console.log(`Connected to server, client id: ${_socket.id}`);
      setClientId(_socket.id);
    }

    function onDisconnect() {
      console.log('Disconnected from server');
      setIsConnected(false);
      setClientId(null);
      setUsernameAdded(false);
      setParty(null);
    }

    function onError(data) {
      console.error(data.message);
    }

    function onPlayerCreated(data) {
      if (data.clientId) {
        setUsernameAdded(true);
      }
    }

    function onPartyCreated(data) {
      console.log(data)
      setParty((prevState) => ({
        ...prevState,
        partyId: data.partyId,
        partyLeader: data.partyLeader
      }));
    }

    _socket.on('connect', onConnect);
    _socket.on('disconnect', onDisconnect);
    _socket.on('error', onError);
    _socket.on('player-created', onPlayerCreated)
    _socket.on('party-created', onPartyCreated)

    return () => {
      _socket.off('connect', onConnect);
      _socket.off('disconnect', onDisconnect);
      _socket.off('error', onError);
      _socket.off('player-created', onPlayerCreated)
      _socket.off('party-created', onPartyCreated)
      _socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Index>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!usernameAdded ? (
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
        ) : (
          <>
            <p>{username}</p>
            {party !== null ? (<p>Party ID: {party.partyId}</p>) : (<button onClick={emitCreateParty}>Create party</button>)}
          </>
        )}
      </main>
    </Index>
  );
}
