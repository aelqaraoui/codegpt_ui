import React from 'react';
import {
  Text,
  Flex,
  Spacer,
  Textarea,
  Input,
} from '@chakra-ui/react';

import GenerateButton from './GenerateButton';
import ErrorFooter from './ErrorFooter';

function CodeEdit() {

  let [error, setError] = React.useState({
    display: "none",
  })

  let [input, setInput] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setInput(inputValue)
  }

  let [instruction, setInstruction] = React.useState('')

  let handleInstructionChange = (e) => {
    let inputValue = e.target.value
    setInstruction(inputValue)
  }

  let [output, setOutput] = React.useState('')

  let handleOutputChange = (e) => {
    let inputValue = e.target.value
    setOutput(inputValue)
  }

  return (
    <>
        <Flex minWidth='max-content' alignItems='left' marginLeft="15%" marginRight="15%" marginTop="100px">
            <div height='500px'>
            <Text mb='8px'>Input :</Text>
            <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder=''
                width='500px'
                height='180px'
                fontFamily='SpaceGrotesk'
            />
            <Text mt='8px' mb='8px'>Instruction :</Text>
            <Textarea
                value={instruction}
                onChange={handleInstructionChange}
                placeholder=''
                width='500px'
                height='80px'
                fontFamily='SpaceGrotesk'
            />
            </div>
            <Spacer />
            <div height='500px'>
            <Text mb='8px'>Output :</Text>
            <Textarea
                value={output}
                onChange={handleOutputChange}
                placeholder=''
                width='500px'
                height='300px'
                fontFamily='SpaceGrotesk'
            />
            </div>
        </Flex>

        <GenerateButton 
            model_name="code-davinci-edit-001"
            request_prompt={input} 
            instruction={instruction}
            setResult={setOutput}
            setError={setError}
          />

        <ErrorFooter error={error}></ErrorFooter> 
    </>
  );
}

export default CodeEdit;