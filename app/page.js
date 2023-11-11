'use client'

import { Center, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  Text,
  Input,
  ButtonGroup,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { Index } from './index'
import { io } from 'socket.io-client'
import { StyledButton } from './components/button'

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
      if (Object.keys(data.players).at(-1) === _socket.id) {
        toast({
          title: 'You joined the party!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: `${data.players[Object.keys(data.players).at(-1)]} joined the party!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }

    function onLeftParty(data) {
      if (data.players === null || !Object.keys(data.players === null ? [] : data.players).includes(_socket.id)) {
        setParty(null)
        setJoinPartyId('')
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
      {!usernameAdded ? (
        <InputGroup margin="3" width="auto">
          <Input
            value={username}
            variant="styled"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            bg="silver.100"
            color="violet.100"
          />
          <InputRightElement>
            <StyledButton
              variant="styled_dark"
              size="sm"
              mr="1.75rem"
              onClick={emitUsernameToServer}
            >
              Set
            </StyledButton>
          </InputRightElement>
        </InputGroup>
      ) : (
        <>
          <Text>Hello {username}</Text>
          {party !== null ? (
            <>
              <Text>Party ID: {party.partyId}</Text>
              <Text>Players:</Text>
              {party.players.map((player) => {
                let isLeader = party.partyLeader === player
                return (
                  <Text key={player}>
                    {player} {isLeader && '👑'}
                  </Text>
                )
              })}
              <StyledButton variant="styled_dark" onClick={emitLeaveParty}>
                {' '}
                Leave Party
              </StyledButton>
            </>
          ) : (
            <>
              <Input
                value={joinPartyId}
                variant="styled"
                onChange={(e) => setJoinPartyId(e.target.value)}
                placeholder="enter party code"
                bg="silver.100"
                color="violet.100"
              />

              <ButtonGroup>
                <StyledButton variant="styled_dark" onClick={emitJoinParty}>
                  {' '}
                  Join Party
                </StyledButton>
                <StyledButton variant="styled_light" onClick={emitCreateParty}>
                  {' '}
                  Create Party
                </StyledButton>
              </ButtonGroup>
            </>
          )}
        </>
      )}
    </Index>
  )
}
