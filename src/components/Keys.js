import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text
} from '@chakra-ui/react';

function Keys(props) {

  let [value, setValue] = React.useState(localStorage.getItem("OPENAI_API_KEY"))

  function handleValueChange(e) {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  return (
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg='black' color='white'>
          <ModalHeader>All the keys are stored in the browser</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>OpenAI API Key :</Text>
            <Input className='openaiapikey' border='2px solid white' value={value} onChange={handleValueChange}></Input>
          </ModalBody>

          <ModalFooter>
            <Button bg='black' border='2px solid white' mr={3} onClick={props.onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default Keys;