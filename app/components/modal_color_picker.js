import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'

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
            <ButtonGroup>
              <Button onClick={() => updateState('R')}>red</Button>
              <Button onClick={() => updateState('B')}>blue</Button>
              <Button onClick={() => updateState('G')}>green</Button>
              <Button onClick={() => updateState('Y')}>yellow</Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}