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

function Translator() {

  let [error, setError] = React.useState({
    display: "none",
  })

  let [prompt, setPrompt] = React.useState('')

  let handlePromptChange = (e) => {
    let inputValue = e.target.value
    setPrompt(inputValue)
  }

  let [code, setCode] = React.useState('')

  let handleCodeChange = (e) => {
    let inputValue = e.target.value
    setCode(inputValue)
  }

  let [from, setFrom] = React.useState('Javascript')

  let handleFromChange = (e) => {
    let inputValue = e.target.value
    setFrom(inputValue)
  }

  let [to, setTo] = React.useState('Python')

  let handleToChange = (e) => {
    let inputValue = e.target.value
    setTo(inputValue)
  }

  return (
    <>
        <Flex minWidth='max-content' alignItems='left' marginLeft="15%" marginRight="15%" marginTop="100px">
            <div height='500px'>
            
            <Flex mb='8px'>
                <Text>From &nbsp;</Text>
                <Input value={from} height='24px' width='150px' onChange={handleFromChange}/>
                <Text>&nbsp;to&nbsp;</Text>
                <Input value={to} height='24px' width='150px' onChange={handleToChange} />
                <Text>&nbsp;: </Text>
            </Flex>
            <Text mb='8px'>{from}: </Text>
            <Textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder=''
                width='500px'
                height='268px'
                fontFamily='sans-serif'
            />
            
            </div>
            <Spacer />
            <div height='500px'>
            <Text mb='8px'>{to}: </Text>
            <Textarea
                value={code}
                onChange={handleCodeChange}
                placeholder=''
                width='500px'
                height='300px'
                fontFamily='sans-serif'
            />
            </div>
        </Flex>

        <GenerateButton 
            model_name="code-davinci-002" 
            request_prompt={"#" + from + " to " + to + ":\n" + from + ":\n" + prompt + "\n\n" + to + ":"} 
            stop={["\n\n\n"]} 
            setResult={setCode}
            setError={setError}
          />

          <ErrorFooter error={error}></ErrorFooter> 
    </>
  );
}

export default Translator;
