'use client'

import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { BasicColorPicker } from './components/modal_color_picker'
import { ChakraBox } from './components/animations/chakraBox'
import { CopyIcon } from './components/copyIcon'
import { GameCard } from './components/card'
import { Index } from './index'
import { Link } from '@chakra-ui/next-js'
import { StyledButton } from './components/button'
import { UserIcon } from './components/userIcon'
import { VerticalCenteredModal } from './components/modal'
import cardsData from '../public/sprites/cards.json'
import copy from 'copy-text-to-clipboard'
import { games } from './components/games'
import { io } from 'socket.io-client'
import kaboom from 'kaboom'
import { useToast } from '@chakra-ui/react'

const URL = 'http://143.167.70.55:696/'

export default function Home() {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [clientId, setClientId] = useState(null)
  const [username, setUsername] = useState('Kush')
  const [usernameAdded, setUsernameAdded] = useState(false)
  const [party, setParty] = useState(null)
  const [joinPartyId, setJoinPartyId] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameState, setGameState] = useState(null)
  const [gameSelected, setGameSelected] = useState('uno')
  const [selectedCard, setSelectedCard] = useState()

  const [openModal, setOpenModal] = useState(false)
  const [modalState, setModalState] = useState('UNKNOWN')

  const canvasRef = useRef()

  const toast = useToast()

  function createModal() {
    setOpenModal(true)
  }

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

  function emitStartGame() {
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

    socket.emit('create-game', {
      partyId: party.partyId,
      clientId: clientId,
      gameId: gameSelected,
    })
  }

  function saveGameSelected(value, disabled) {
    if (disabled) {
      toast({
        title: `Game ${value} is disabled!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      setGameSelected(value)
      toast({
        title: `Selected ${value}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const _socket = io(URL)
    setSocket(_socket)

    var _clientId = ''
    var _partyId = ''
    var _kaboom = null
    var currentDisplayHand = []
    var currentDisplayFacingCard = null
    var displayIsYourTurn = null
    var displayPickUpCard = null
    var selectColourScene = null

    function onConnect() {
      setIsConnected(true)
      console.log(`Connected to server`)
      if (!window.localStorage.getItem('clientId')) {
        _socket.emit('get-uuid')
      } else {
        setClientId(window.localStorage.getItem('clientId'))
        _clientId = window.localStorage.getItem('clientId')
        toast({
          title: 'Connected to server',
          description: `Client ID: ${window.localStorage.getItem('clientId')}`,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      }
    }

    function onDisconnect() {
      console.log('Disconnected from server')
      setIsConnected(false)
      setUsernameAdded(false)
      setParty(null)
      setIsPlaying(false)
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

    function onSetUuid(data) {
      setClientId(data.uuid)
      window.localStorage.setItem('clientId', data.uuid)
      _clientId = data.uuid
      toast({
        title: 'Retrieved client ID',
        description: `Client ID: ${data.uuid}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    }

    function onPlayerCreated(data) {
      if (data.clientId) {
        setUsernameAdded(true)
        toast({
          title: `Welcome ${username}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
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
      _partyId = data.partyId
    }

    function onJoinedParty(data) {
      console.log(data)
      setParty((prevState) => ({
        ...prevState,
        partyId: data.partyId,
        partyLeader: data.partyLeader,
        players: data.players,
      }))
      _partyId = data.partyId

      if (Object.keys(data.players).at(-1) === _clientId) {
        toast({
          title: 'You joined the party!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: `${data.players[Object.keys(data.players).at(-1)]
            } joined the party!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }

    function onLeftParty(data) {
      if (
        data.players === null ||
        !Object.keys(data.players === null ? [] : data.players).includes(
          _clientId,
        )
      ) {
        setParty(null)
        setJoinPartyId('')
        setIsPlaying(false)
      } else {
        setParty((prevState) => ({
          ...prevState,
          partyLeader: data.partyLeader,
          players: data.players,
        }))
      }
    }

    function onGameCreated(data) {
      toast.closeAll()
      console.log(data)
      setIsPlaying(true)
      setGameState((prevState) => ({
        ...prevState,
        gameId: data.gameId,
        currentPlayer: data.current_player,
      }))

      _socket.emit('get-game-state', {
        partyId: _partyId,
        clientId: _clientId,
        gameId: gameSelected,
      })

      _kaboom = kaboom({
        width: 960,
        height: 540,
        canvas: canvasRef.current,
        global: false,
        background: [0, 0, 0, 0],
      })

      _kaboom.loadSpriteAtlas('sprites/uno_sprites.png', cardsData)
    }

    function onGameState(data) {
      console.log(data)
      currentDisplayHand.map((card) => {
        card.destroy()
      })

      if (currentDisplayFacingCard !== null) {
        currentDisplayFacingCard.destroy()
      }

      if (displayIsYourTurn !== null) {
        displayIsYourTurn.destroy()
      }

      if (displayPickUpCard !== null) {
        displayPickUpCard.destroy()
      }

      setGameState((prevState) => ({
        ...prevState,
        currentFacingCard: data.gameState.c_facing_card,
        currentHand: data.gameState.c_hand,
        currentPlayer: data.gameState.current_player,
      }))

      var currentHand = data.gameState.c_hand

      currentDisplayFacingCard = _kaboom.add([
        _kaboom.sprite(data.gameState.c_facing_card),
        _kaboom.pos(_kaboom.width() / 2, _kaboom.height() / 2),
        _kaboom.anchor('center'),
        _kaboom.area(),
      ])

      displayPickUpCard = _kaboom.add([
        _kaboom.sprite('BACK'),
        _kaboom.pos((_kaboom.width() / 2) + 150, _kaboom.height() / 2),
        _kaboom.rotate(15),
        _kaboom.anchor('center'),
        _kaboom.area(),
      ])

      displayPickUpCard.onClick(() => {
        _socket.emit('pickup-card', {
          partyId: _partyId,
          clientId: _clientId,
          gameId: gameSelected,
        })
      })

      displayPickUpCard.onHover(() => {
        _kaboom.setCursor("pointer")
        _kaboom.tween(
          displayPickUpCard.pos,
          _kaboom.vec2(displayPickUpCard.pos.x - 5, displayPickUpCard.pos.y - 5),
          0.5,
          (p) => (displayPickUpCard.pos = p),
          _kaboom.easings.easeOutExpo,
        )
        _kaboom.tween(
          15,
          10,
          0.5,
          (p) => (displayPickUpCard.rotateTo(p)),
          _kaboom.easings.easeOutExpo,
        )
      })

      displayPickUpCard.onHoverEnd(() => {
        _kaboom.setCursor("default")
        _kaboom.tween(
          displayPickUpCard.pos,
          _kaboom.vec2(displayPickUpCard.pos.x + 5, displayPickUpCard.pos.y + 5),
          0.5,
          (p) => (displayPickUpCard.pos = p),
          _kaboom.easings.easeOutExpo,
        )
        _kaboom.tween(
          10,
          15,
          0.5,
          (p) => (displayPickUpCard.rotateTo(p)),
          _kaboom.easings.easeOutExpo,
        )
      })

      if (data.gameState.current_player === _clientId) {
        displayIsYourTurn = _kaboom.add([
          _kaboom.text("[green]It's your turn![/green]", {
            size: 24,
            styles: {
              green: {
                color: _kaboom.rgb(163, 230, 53),
              },
            },
            transform: (idx, ch) => ({
              scale: _kaboom.wave(1, 1.3, _kaboom.time() * 2)
            }),
          }),
          _kaboom.pos(_kaboom.width() / 2, _kaboom.height() - 165),
          _kaboom.anchor('center'),
          _kaboom.area(),
        ])
      }

      let numCards = currentHand.length
      let xPos = _kaboom.width() / 2 - Math.floor(numCards / 2) * 82
      let yPos = _kaboom.height() - 70
      let zPos = 0 // Use Z position to keep track of which card is clicked

      currentHand.map((cardId, idx) => {
        let c = _kaboom.add([
          _kaboom.sprite(cardId),
          _kaboom.pos(xPos, yPos),
          _kaboom.anchor('center'),
          _kaboom.area(),
          _kaboom.z(zPos),
        ])

        currentDisplayHand.push(c)

        xPos += 84
        zPos += 1

        c.onHover(() => {
          _kaboom.setCursor("pointer")
          _kaboom.tween(
            c.pos,
            _kaboom.vec2(c.pos.x, c.pos.y - 30),
            0.5,
            (p) => (c.pos = p),
            _kaboom.easings.easeOutExpo,
          )
        })
        c.onHoverEnd(() => {
          _kaboom.setCursor("default")
          _kaboom.tween(
            c.pos,
            _kaboom.vec2(c.pos.x, yPos),
            0.5,
            (p) => (c.pos = p),
            _kaboom.easings.easeOutExpo,
          )
        })
        c.onClick(() => {
          let selectedCard = currentHand[c.z]

          if (selectedCard.slice(0, 1) === 'W') {
            createModal()
            setSelectedCard(selectedCard)
          } else {
            _socket.emit('update-game-state', {
              partyId: _partyId,
              clientId: _clientId,
              gameId: gameSelected,
              gameState: { played_card: selectedCard },
            })
          }
        })
      })
    }

    function onNewGameStateAvailable(data) {
      console.log(data)
      _socket.emit('get-game-state', {
        partyId: _partyId,
        clientId: _clientId,
        gameId: gameSelected,
      })
    }

    _socket.on('connect', onConnect)
    _socket.on('disconnect', onDisconnect)
    _socket.on('error', onError)
    _socket.on('set-uuid', onSetUuid)
    _socket.on('player-created', onPlayerCreated)
    _socket.on('party-created', onPartyCreated)
    _socket.on('joined-party', onJoinedParty)
    _socket.on('left-party', onLeftParty)
    _socket.on('game-created', onGameCreated)
    _socket.on('game-state', onGameState)
    _socket.on('new-game-state-available', onNewGameStateAvailable)

    return () => {
      _socket.off('connect', onConnect)
      _socket.off('disconnect', onDisconnect)
      _socket.off('error', onError)
      _socket.off('set-uuid', onSetUuid)
      _socket.off('player-created', onPlayerCreated)
      _socket.off('party-created', onPartyCreated)
      _socket.off('joined-party', onJoinedParty)
      _socket.off('left-party', onLeftParty)
      _socket.off('game-created', onGameCreated)
      _socket.off('game-state', onGameState)
      _socket.off('new-game-state-available', onNewGameStateAvailable)
      _socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
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
    if (!isPlaying) {
      console.error('Game not started')
      return
    }

    if (modalState !== 'UNKNOWN' && selectedCard.slice(0, 1) === 'W') {
      socket.emit('update-game-state', {
        partyId: party.partyId,
        clientId: clientId,
        gameId: gameSelected,
        gameState: { played_card: selectedCard, selected_colour: modalState },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState, selectedCard])

  return (
    <Index>
      {!usernameAdded ? (
        <InputGroup margin="3" width="16rem">
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
              bg="teal.300"
              color="violet.100"
            >
              Set
            </StyledButton>
          </InputRightElement>
        </InputGroup>
      ) : (
        <>
          {party !== null ? (
            <>
              <Flex direction="row" alignItems="center" justifyContent="center">
                <Text>
                  Party ID: <Text as="b">{party.partyId}</Text>
                </Text>
                <IconButton
                  onClick={() => {
                    copy(party.partyId)
                    toast({
                      title: 'Copied the party code!',
                      status: 'info',
                      duration: 1500,
                      isClosable: true,
                    })
                  }}
                  bg="none"
                  _hover={{ bg: 'none' }}
                  icon={<CopyIcon />}
                />
              </Flex>
              <Text mb="0.5rem"> Current game: {gameSelected}</Text>
              <Text> Players:</Text>
              <SimpleGrid columns="2" spacing="2.5">
                {Object.keys(party.players).map((playerId) => {
                  let isLeader = party.partyLeader === playerId
                  return (
                    <UserIcon key={playerId} leader={isLeader.toString()}>
                      {party.players[playerId]}
                    </UserIcon>
                  )
                })}
              </SimpleGrid>
              {!isPlaying && (
                <ButtonGroup>
                  <StyledButton
                    variant="styled_dark"
                    bg="red.800"
                    onClick={emitLeaveParty}
                  >
                    Leave Party
                  </StyledButton>
                  {party.partyLeader === clientId && (
                    <>
                      <VerticalCenteredModal
                        variant="styled_light"
                        buttonText="Select Game"
                        isPlaying={isPlaying}
                        heading="Current Games"
                      >
                        <SimpleGrid columns={1} spacing="1rem">
                          {games.map((game, index) => {
                            return (
                              <ChakraBox
                                key={index}
                                onClick={() => saveGameSelected(game.name, game.disabled)}
                                whileTap={{
                                  scale: 0.9,
                                }}
                                whileFocus={{
                                  opacity: 0.8,
                                }}
                              >
                                <GameCard
                                  header={game.header}
                                  src={game.src}
                                  alt={game.alt}
                                  name={game.name}
                                  disabled={game.disabled}
                                >
                                  {game.desc}
                                </GameCard>
                              </ChakraBox>
                            )
                          })}
                        </SimpleGrid>
                      </VerticalCenteredModal>
                      <StyledButton
                        variant="styled_dark"
                        bg="teal.300"
                        color="violet.100"
                        onClick={emitStartGame}
                      >
                        Start Game
                      </StyledButton>
                    </>
                  )}
                </ButtonGroup>
              )}
              <canvas ref={canvasRef} />
            </>
          ) : (
            <>
              <Text fontSize="xl" my="1rem">
                Hello {username}!
              </Text>
              <Input
                maxW="16rem"
                value={joinPartyId}
                variant="styled"
                onChange={(e) => setJoinPartyId(e.target.value.toUpperCase())}
                placeholder="enter party code"
                bg="silver.100"
                color="violet.100"
              />

              <ButtonGroup>
                <StyledButton variant="styled_dark" onClick={emitJoinParty}>
                  Join Party
                </StyledButton>
                <StyledButton variant="styled_light" onClick={emitCreateParty}>
                  Create Party
                </StyledButton>
              </ButtonGroup>
            </>
          )}
        </>
      )}
      {openModal && <BasicColorPicker updateState={setModalState} setOpenModal={setOpenModal} />}
    </Index>
  )
}
