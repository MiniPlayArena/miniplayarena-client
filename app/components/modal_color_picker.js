import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'

import { ChakraBox } from './animations/chakraBox'

export function BasicColorPicker(props) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  function close() {
    props.setOpenModal(false)
    onClose()
  }

  function updateState(value) {
    props.updateState(value)
    close()
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <SimpleGrid columns="2">
              <ColorComponent bg="red.card" onClick={() => updateState('R')} />
              <ColorComponent bg="blue.card" onClick={() => updateState('B')} />
              <ColorComponent
                bg="green.card"
                onClick={() => updateState('G')}
              />
              <ColorComponent
                bg="yellow.card"
                onClick={() => updateState('Y')}
              />
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function ColorComponent(props) {
  return (
    <ChakraBox
      width="10rem"
      height="10rem"
      borderRadius="md"
      whileHover={{
        opacity: 1,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
      }}
      {...props}
    ></ChakraBox>
  )
}
