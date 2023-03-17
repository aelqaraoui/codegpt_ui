import React from 'react';
import {
  Center,
  Button,
} from '@chakra-ui/react';

import axios from 'axios';

function GenerateButton(props) {

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
                <Button isLoading bgColor='black' border='2px solid white' onClick={onGenerate}>Generate</Button>
            </Center>
        )
        } else {
        return (
            <Center m='50px'>
                <Button bgColor='black' border='2px solid white' onClick={onGenerate}>Generate</Button>
            </Center>
        )
    }
}

export default GenerateButton;
