'use client'

import { Center, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Index } from './index'
import { io } from 'socket.io-client'

const URL = 'http://143.167.68.112:696/'

export default function Home() {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [clientId, setClientId] = useState(null)
  const [username, setUsername] = useState('Kush')
  const [usernameAdded, setUsernameAdded] = useState(false)
  const [party, setParty] = useState(null)
  const [joinPartyId, setJoinPartyId] = useState('')

  const toast = useToast()

  function emitUsernameToServer(e) {
    e.preventDefault()
    if (!socket) {
      console.error('Socket not connected')
      return
    }

    socket.emit('create-player', { clientId: clientId, username: username })
  }

  function emitCreateParty() {
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

  function emitJoinParty(e) {
    e.preventDefault()

    if (!socket) {
      console.error('Socket not connected')
      return
    }
    if (!clientId) {
      console.error('Client ID not set')
      return
    }

    socket.emit('join-party', { partyId: joinPartyId, clientId: clientId })
  }

  function emitLeaveParty() {
    if (!socket) {
      console.error('Socket not connected')
      return
    }
    if (!clientId) {
      console.error('Client ID not set')
      return
    }
    if (!party.partyId) {
      console.error('Party ID not set')
      return
    }

    socket.emit('leave-party', { partyId: party.partyId, clientId: clientId })
  }

  useEffect(() => {
    const _socket = io(URL)
    setSocket(_socket)

    function onConnect() {
      setIsConnected(true)
      console.log(`Connected to server, client id: ${_socket.id}`)
      setClientId(_socket.id)
      toast({
        title: 'Connected to server',
        description: `Client ID: ${_socket.id}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }

    function onDisconnect() {
      console.log('Disconnected from server')
      setIsConnected(false)
      setClientId(null)
      setUsernameAdded(false)
      setParty(null)
      toast({
        title: 'Disconnected from server',
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }

    function onError(data) {
      console.error(data.message)
      toast({
        title: 'An error occurred',
        description: data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }

    function onPlayerCreated(data) {
      if (data.clientId) {
        setUsernameAdded(true)
      }
    }

    function onPartyCreated(data) {
      console.log(data)
      setParty((prevState) => ({
        ...prevState,
        partyId: data.partyId,
        partyLeader: data.partyLeader,
        players: data.players,
      }))
    }

    function onJoinedParty(data) {
      setParty((prevState) => ({
        ...prevState,
        partyId: data.partyId,
        partyLeader: data.partyLeader,
        players: data.players,
      }))
    }

    function onLeftParty(data) {
      console.log(data)
      if (data.players === null || Object.keys(data.players).includes(clientId)) {
        setParty(null)
      } else {
        setParty((prevState) => ({
          ...prevState,
          partyLeader: data.partyLeader,
          players: data.players,
        }))
      }
    }

    _socket.on('connect', onConnect)
    _socket.on('disconnect', onDisconnect)
    _socket.on('error', onError)
    _socket.on('player-created', onPlayerCreated)
    _socket.on('party-created', onPartyCreated)
    _socket.on('joined-party', onJoinedParty)
    _socket.on('left-party', onLeftParty)

    return () => {
      _socket.off('connect', onConnect)
      _socket.off('disconnect', onDisconnect)
      _socket.off('error', onError)
      _socket.off('player-created', onPlayerCreated)
      _socket.off('party-created', onPartyCreated)
      _socket.off('joined-party', onJoinedParty)
      _socket.off('left-party', onLeftParty)
      _socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Index>
      <Center>
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
            <p>Hello {username}</p>
            {party !== null ? (
              <>
                <p>Party ID: {party.partyId}</p>
                <p>Players:</p>
                {Object.keys(party.players).map((playerId) => {
                  let isLeader = party.partyLeader === playerId
                  return (
                    <p key={playerId}>
                      {party.players[playerId]} {isLeader && '👑'}
                    </p>
                  )
                })}
                <button onClick={emitLeaveParty}>Leave party</button>
              </>
            ) : (
              <>
                <form onSubmit={emitJoinParty}>
                  <label>
                    Enter a party code:
                    <input
                      className="text-black"
                      type="text"
                      value={joinPartyId}
                      onChange={(e) => setJoinPartyId(e.target.value)}
                    />
                  </label>
                  <input type="submit" />
                </form>

                <button onClick={emitCreateParty}>Create party</button>
              </>
            )}
          </>
        )}
      </Center>
    </Index>
  )
}
