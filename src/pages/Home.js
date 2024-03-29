import React from 'react';
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
  Center,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import Fonts from '../components/Fonts';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
  
      },
    },
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "white",
            color: "black",
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

function Home() {

  return (
    <ChakraProvider theme={theme}>
        <Fonts />
        <Center>
            <Heading as='h1' size='3xl' mt="2em">CODEGPT</Heading>
        </Center>
        <Center>
            <Text fontSize='1.5rem' mt="5em">UI for ChatGPT to make dev easier</Text>
        </Center>
        <Center>
            <Text fontSize='1.5rem' mt="1em">A set of tools and templates that will help debug, edit or explain code</Text>
        </Center>
        <Center mt='7rem'>
            <Flex>
                <Button bgColor='white' border='2px solid black' ml='1em' onClick={
                  (e) => {
                    e.preventDefault();
                    window.location.href='/login';
                  }
                }>LOGIN</Button>
                <Button bgColor='white' border='2px solid black' ml='1em' onClick={
                  (e) => {
                    e.preventDefault();
                    window.location.href='/register';
                  }
                }>REGISTER</Button>
            </Flex>
        
        </Center>
        
    </ChakraProvider>
  );
}

export default Home;
