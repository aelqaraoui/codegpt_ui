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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import UpgradePremium from '../components/UpgradePremium';
import Fonts from '../components/Fonts';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJg5tWD_H920aRxDLTbCqgEPHp2vcxIR0",
  authDomain: "codegpt-fdbe3.firebaseapp.com",
  projectId: "codegpt-fdbe3",
  storageBucket: "codegpt-fdbe3.appspot.com",
  messagingSenderId: "627192950526",
  appId: "1:627192950526:web:499a4563aad82cf5e03faf",
  measurementId: "G-4MY6M57ZBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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

  let [payments, setPayments] = useState(0)

  let [user_uid, setUserUid] = useState('')

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShow(true)
        setUserUid(user.uid)
        if(user.emailVerified) {
          setEmailVerified(true)
        }
      } else {
        window.location.href = '/'
      }
    });
  }) 

  let [requests, setRequests] = useState(0)

  async function updateRequests() {
    const citiesRef = collection(db, "requests");

    const q = query(citiesRef, where("user_id", "==", user_uid));
    const querySnapshot = await getDocs(q);

    let counter = 0
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      counter += 1
    });

    if(counter >= 1) {
      setRequests(counter)
      console.log(payments)
    }
  }

  async function updatePaymentStatus() {
    const citiesRef = collection(db, "payments");

    const q = query(citiesRef, where("user_id", "==", user_uid));
    const querySnapshot = await getDocs(q);

    let counter = 0
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      counter += 1
    });

    setPayments(counter)
    console.log(payments)
  }

  useEffect(() => {
    let logPayment = async (user_id) => {
      try {
        const docRef = await addDoc(collection(db, "payments"), {
          user_id: user_id,
          timestamp: new Date(),
        });
        console.log("Payment written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding payment: ", e);
      }
    }

    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      logPayment(user_uid)
    }

    updateRequests()
    updatePaymentStatus()
  }, [])
  
  if(show && !emailVerified) {

    return (
      <ChakraProvider theme={theme}>
          <Fonts />
          <Center>
              <Heading as='h1' size='3xl' mt="2em" mb="5rem">CODEGPT</Heading>
          </Center>


          <Center>
              <Heading as='h3' size='md' mt="2em" mb="5rem">Please verify your email</Heading>
          </Center>
          <Center>
              <Button bgColor='white' border='2px solid black' ml='1em' onClick={
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
        <Fonts />
        <UpgradePremium isOpen={(requests >= 10) || (payments < 1)}></UpgradePremium>
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

            <Flex bg='white'  marginLeft="50%">
              <Text>OpenAI API Key :&nbsp;</Text>
              <Button height='24px' bgColor='white' border='2px solid black' onClick={onOpen}>sk-***</Button>
              <Keys isOpen={isOpen || !localStorage.getItem("OPENAI_API_KEY")} onOpen={onOpen} onClose={onOpenAPIChange}></Keys>
            </Flex>
          </Grid>

          {
            (() => {
              if(template == 'boilerplate') {
                return (<Boilerplate user_uid={user_uid} updateRequests={updateRequests}></Boilerplate>)
              } else if (template == 'bugfixer') {
                return (<Bugfixer user_uid={user_uid} updateRequests={updateRequests}></Bugfixer>)
              } else if (template == 'translator') {
                return (<Translator user_uid={user_uid} updateRequests={updateRequests}></Translator>)
              } else if (template == 'codeeditor') {
                return (<CodeEdit user_uid={user_uid} updateRequests={updateRequests}></CodeEdit>)
              } else if (template == 'explaincode') {
                return (<ExplainCode user_uid={user_uid} updateRequests={updateRequests}></ExplainCode>)
              } 
            })()
          }

        
        </div>
      </ChakraProvider>
    );
  }
}

export default ActualApp;
