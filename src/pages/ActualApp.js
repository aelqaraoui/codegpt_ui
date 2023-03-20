import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  Heading,
  Flex,
  Button,
  Select,
  useDisclosure,
  Input,
  Center
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import Boilerplate from '../components/Boilerplate';
import Bugfixer from '../components/Bugfixer';
import Translator from '../components/Translator';
import Keys from "../components/Keys"
import CodeEdit from '../components/CodeEdit';
import ExplainCode from '../components/ExplainCode';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
  
      },
    },
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "black",
            color: "white",
          }
        })
      }
    }
  },
  fonts: {
    heading: `'AldotheApache', sans-serif`,
    body: `'AldotheApache', sans-serif`,
    Textarea: `'SpaceGrotesk', sans-serif`,
  },
})

function ActualApp() {

  let [template, setTemplate] = React.useState('boilerplate')

  function swicthTemplate(e) {
    let inputValue = e.target.value
    setTemplate(inputValue)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  function onOpenAPIChange(e) {
    localStorage.setItem("OPENAI_API_KEY", document.getElementsByClassName("openaiapikey")[0].value);
    onClose()
    window.location.reload() 
  }

  let [show, setShow] = useState(false)
  let [emailVerified, setEmailVerified] = useState(false)

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShow(true)
        if(user.emailVerified) {
          setEmailVerified(true)
        }
      } else {
        window.location.href = '/'
      }
    });
  }) 

  if(show && !emailVerified) {

    return (
      <ChakraProvider theme={theme}>
          <Center>
              <Heading as='h1' size='3xl' mt="2em" mb="5rem">CODEGPT</Heading>
          </Center>


          <Center>
              <Heading as='h3' size='medium' mt="2em" mb="5rem">Please verify your email</Heading>
          </Center>
          <Center>
              <Button bgColor='black' border='2px solid white' ml='1em' onClick={
                  (e) => {
                    e.preventDefault();
                    window.location.reload();
                  }
                }>Proceed to app</Button>
          </Center>

          
          
          
      </ChakraProvider>
    );
  } else if(show) {

    return (
      <ChakraProvider theme={theme}>
        <div max-width='400px' margin="0 auto">
          <Grid templateColumns='repeat(3, 1fr)' gap={6} minWidth='max-content' alignItems='center' m="50px">
            <Box fontSize="xl">
              <Heading as='h1' size='3xl'>CODEGPT</Heading>
            </Box>

            <Select width='150px' marginLeft="30%" onChange={swicthTemplate} value={template}>
              <option value='boilerplate'>BOILERPLATE</option>
              <option value='bugfixer'>BUG FIXER</option>
              <option value='translator'>TRANSLATOR</option>
              <option value='codeeditor'>CODE EDITOR</option>
              <option value='explaincode'>EXPLAIN CODE</option>
            </Select>

            <Flex bg='black'  marginLeft="50%">
              <Text>OpenAI API Key :&nbsp;</Text>
              <Button height='24px' bgColor='black' border='2px solid white' onClick={onOpen}>sk-***</Button>
              <Keys isOpen={isOpen || !localStorage.getItem("OPENAI_API_KEY")} onOpen={onOpen} onClose={onOpenAPIChange}></Keys>
            </Flex>
          </Grid>

          {
            (() => {
              if(template == 'boilerplate') {
                return (<Boilerplate></Boilerplate>)
              } else if (template == 'bugfixer') {
                return (<Bugfixer></Bugfixer>)
              } else if (template == 'translator') {
                return (<Translator></Translator>)
              } else if (template == 'codeeditor') {
                return (<CodeEdit></CodeEdit>)
              } else if (template == 'explaincode') {
                return (<ExplainCode></ExplainCode>)
              } 
            })()
          }

        
        </div>
      </ChakraProvider>
    );
  }
}

export default ActualApp;
