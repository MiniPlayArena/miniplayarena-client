'use client'

import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'

const URL = 'http://143.167.68.112:696/'

export default function Home() {
  const [socket, setSocket] = useState()
  const [isConnected, setIsConnected] = useState(false)
  const [clientId, setClientId] = useState()
  const [username, setUsername] = useState('Kush')

  function connectToServer(e) {
    e.preventDefault()
    if (!socket) {
      console.log('Socket not instantiated yet')
      return
    }

    console.log('Connecting to socket')
    socket.connect()
  }

  useEffect(() => {
    console.log('Initalising socket')
    const socket = io(URL, { autoConnect: false })
    console.log('Socket successfully initialised')
    setSocket(socket)

    function onConnect(socket) {
      setIsConnected(true);
      console.log(`Connected to server, client id: ${socket.id}`)
      setClientId(socket.id)
    }

    function onDisconnect() {
      console.log('Disconnected from server')
      setIsConnected(false);
      setClientId(null)
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={connectToServer}>
        <label>Enter your name:
          <input
            className='text-black'
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
  )
}
