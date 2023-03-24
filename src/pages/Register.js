import React, { useState, useEffect } from 'react';
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
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { extendTheme } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Fonts from '../components/Fonts';

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

function Register() {

  let [show, setShow] = useState(false)

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = '/app'
      } else {
        setShow(true)
      }
    });
  })

  if(show) {

    return (
      <ChakraProvider theme={theme}>
        <Fonts />
          <Center>
              <Heading as='h1' size='3xl' mt="2em" mb="5rem">CODEGPT</Heading>
          </Center>
          <Formik
              initialValues={{ fname: '', lname: '', email: '', password: '' }}
              validate={values => {
                  const errors = {};
                  if (!values.email) {
                  errors.email = 'Required';
                  } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                  errors.email = 'Invalid email address';
                  }

                  if (!values.password) {
                      errors.password = 'Required';
                  }
                  return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                  const auth = getAuth();
                  createUserWithEmailAndPassword(auth, values.email, values.password)
                  .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      console.log(user)

                      sendEmailVerification(auth.currentUser)
                      .then(() => {
                        // Email verification sent!
                        // ...
                        console.log("Verification Email Sent")
                      });

                      window.location = "/app"
                      // ...
                  })
                  .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      alert(errorMessage)
                      // ..
                  });
                  setTimeout(() => {
                  setSubmitting(false);
                  }, 400);
              }}
              >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                  <form style={{Align: "center", width: "20rem", margin: "0 auto"}}  onSubmit={handleSubmit}>
                      <p style={{marginTop: "1rem"}}>First name : </p>
                      <input
                          type="text"
                          name="fname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fname}
                          style={{width: "100%"}}
                      />
                      <p style={{marginTop: "1rem"}}>Last name : </p>
                      <input
                          type="text"
                          name="lname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lname}
                          style={{width: "100%"}}
                      />
                      <p style={{marginTop: "1rem"}}>Email : </p>
                      <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          style={{width: "100%"}}
                      />
                      {errors.email && touched.email && errors.email}
                      <p style={{marginTop: "1rem"}}>Password : </p>
                      <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          style={{width: "100%"}}
                      />
                      {errors.password && touched.password && errors.password}
                      <Center><button style={{width: '5rem', margin: "2rem auto", border: "2px solid white", borderRadius: "5px"}} type="submit" disabled={isSubmitting}>
                          Register
                      </button></Center>
                  </form>
              )}
          </Formik>

          
          
      </ChakraProvider>
    );
  }
}

export default Register;
