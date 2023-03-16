import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Heading,
  Flex,
  Spacer,
  Textarea,
  HStack,
  Center,
  Button,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import Fonts from './Fonts'
import Boilerplate from './Boilerplate';
import Bugfixer from './Bugfixer';
import Translator from './Translator';
import Keys from "./Keys"

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

function App() {

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

  return (
    <ChakraProvider theme={theme}>
      
      <Grid templateColumns='repeat(3, 1fr)' gap={6} minWidth='max-content' alignItems='center' m="50px">
        <Box fontSize="xl">
          <Heading as='h1' size='3xl'>CODEGPT</Heading>
        </Box>
        <Select width='150px' marginLeft="30%" onChange={swicthTemplate} value={template}>
          <option value='boilerplate'>BOILERPLATE</option>
          <option value='bugfixer'>BUG FIXER</option>
          <option value='translator'>TRANSLATOR</option>
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
          } 
        })()
      }

      

    </ChakraProvider>
  );
}

export default App;
