import React from 'react';
import {
  Text,
  Flex,
  Spacer,
  Textarea,
} from '@chakra-ui/react';

import GenerateButton from './GenerateButton';
import ErrorFooter from './ErrorFooter';

function Boilerplate(props) {

  let [error, setError] = React.useState({
    display: "none",
  })

  let [prompt, setPrompt] = React.useState('Write boilerplate code for ')

  let handlePromptChange = (e) => {
    let inputValue = e.target.value
    setPrompt(inputValue)
  }

  let [code, setCode] = React.useState('')

  let handleCodeChange = (e) => {
    let inputValue = e.target.value
    setCode(inputValue)
  }

  return (
    <>
        <Flex minWidth='max-content' alignItems='left' marginLeft="15%" marginRight="15%" marginTop="100px">
            <div height='500px'>
            <Text mb='8px'>Prompt :</Text>
            <Textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder=''
                width='500px'
                height='300px'
                fontFamily='sans-serif'
                border='2px solid black'
            />
            </div>
            <Spacer />
            <div height='500px'>
            <Text mb='8px'>Code :</Text>
            <Textarea
                value={code}
                onChange={handleCodeChange}
                placeholder=''
                width='500px'
                height='300px'
                fontFamily='sans-serif'
                border='2px solid black'
            />
            </div>
        </Flex>

        <GenerateButton 
            model_name="text-davinci-003" 
            request_prompt={prompt} 
            stop={["\n\n#\n\n"]} 
            setResult={setCode}
            setError={setError}
            user_uid={props.user_uid}
            updateRequests={props.updateRequests}
          />

        <ErrorFooter error={error}></ErrorFooter>
        
    </>
  );
}

export default Boilerplate;
