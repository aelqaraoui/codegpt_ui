import React, { useEffect, useState } from 'react';
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
    Text,
    Heading
} from '@chakra-ui/react';

function UpgradePremium(props) {

  return (
      <Modal isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg='black' color='white' alignItems='center'>
          <ModalHeader>$29 One Time Purchase</ModalHeader>
          <ModalBody textAlign='center'>

            <Text>You ran out! No more free requests!</Text>
            <Text>Access all the premium features</Text>
            <br/>
            <Text>1. Get unlimited requests</Text>
            <Text>2. Get access to all templates and tools</Text>
            <Text>3. Generate code that actually runs (Coming soon)</Text>
          </ModalBody>

          <ModalFooter  textAlign='center' alignContent='center'>
            <form action='http://67.207.94.192:4242/create-checkout-session' method='POST'>
              <Button type='submit' bg='black' border='2px solid white' mr={3} onClick={props.onClose}>
                Buy Now
              </Button>
              <Text>Powered by Stripe</Text>
            </form>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default UpgradePremium;