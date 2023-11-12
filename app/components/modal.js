import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { StyledButton } from './button'

export function VerticalCenteredModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {props.isPlaying === false && (
        <StyledButton variant={props.variant} onClick={onOpen}>
          {' '}
          {props.buttonText}{' '}
        </StyledButton>
      )}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
        variant={'styled'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {props.heading} </ModalHeader>
          <ModalBody>{props.children}</ModalBody>
          <ModalFooter>
            <StyledButton variant="styled_dark" bg="lime.400" onClick={onClose}>
              {' '}
              Select{' '}
            </StyledButton>
            {props.functionButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
