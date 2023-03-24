import React from 'react';
import {
  Center,
  Button,
} from '@chakra-ui/react';

import axios from 'axios';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

function GenerateButton(props) {

    let logRequest = async (user_id) => {
        try {
          const docRef = await addDoc(collection(db, "requests"), {
            user_id: user_id,
            timestamp: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    let [loading, setLoading] = React.useState(false)

    let onGenerate = () => {
        setLoading(true)

        let generatePrompt = async () => {

            const response = await axios.post(
                props.model_name.includes("edit") ? 'https://api.openai.com/v1/' + 'edits' : 'https://api.openai.com/v1/' + 'completions', 

                props.model_name.includes("edit") ? {
                    "model": props.model_name,
                    "input": props.request_prompt,
                    "instruction": props.instruction,
                } : {
                    "model": props.model_name,
                    "prompt": props.request_prompt,
                    "max_tokens": 1024,
                    "temperature": 0.3,
                    "stop": props.stop
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("OPENAI_API_KEY")
                    }
                }
            )

            return response.data.choices[0].text.trim()
        }

        generatePrompt().then((result) => {
            props.setResult(result)
        }).then(() => {
            logRequest(props.user_uid)
            props.updateRequests()
        }).catch((e) => {
            console.log(e)
            setLoading(false)
            props.setError({
                display: 'flex',
                title: e.toString()
            })
            setTimeout(() => {
                props.setError({
                    display: 'none',
                })
            }, 5000)
          }).then(() => {setLoading(false)})
    }

    if(loading) {
        return (
            <Center m='50px'>
                <Button isLoading bgColor='white' border='2px solid black' onClick={onGenerate}>Generate</Button>
            </Center>
        )
        } else {
        return (
            <Center m='50px'>
                <Button bgColor='white' border='2px solid black' onClick={onGenerate}>Generate</Button>
            </Center>
        )
    }
}

export default GenerateButton;
