import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure , SimpleGrid} from '@chakra-ui/react'
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
            <SimpleGrid columns='2' spacing='0'>
              <ColorComponent bg='red.600' onClick={() => updateState('R')} />
              <ColorComponent bg='blue.500' onClick={() => updateState('B')} />
              <ColorComponent bg='green.400' onClick={() => updateState('G')} />
              <ColorComponent bg='yellow.400' onClick={() => updateState('Y')} />
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


function ColorComponent(props){
    return (
        <ChakraBox
            width='10rem'
            height='10rem'
            whileHover={{
                opacity: 0.9,
                scale: 1.08,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.92,
              }}
            {...props}
        >

        </ChakraBox>
    )
}