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

function Bugfixer(props) {

  let [error, setError] = React.useState({
    display: "none",
  })

  let [buggy, setBuggy] = React.useState('')

  let handleBuggyChange = (e) => {
    let inputValue = e.target.value
    setBuggy(inputValue)
  }

  let [fixed, setFixed] = React.useState('')

  let handleFixedChange = (e) => {
    let inputValue = e.target.value
    setFixed(inputValue)
  }

  let [language, setLanguage] = React.useState('Python')

  let handleLanguageChange = (e) => {
    let inputValue = e.target.value
    setLanguage(inputValue)
  }

  return (
    <>
        <Flex minWidth='max-content' alignItems='left' marginLeft="15%" marginRight="15%" marginTop="100px">
            <div height='500px'>
            <Flex mb='8px'>
                <Text>Language : &nbsp;</Text>
                <Input 
                  value={language} 
                  height='24px' 
                  width='150px' 
                  onChange={handleLanguageChange}
                  border='2px solid black'/>
            </Flex>
            <Text mb='8px'>Buggy {language} :</Text>
            <Textarea
                value={buggy}
                onChange={handleBuggyChange}
                placeholder=''
                width='500px'
                height='268px'
                fontFamily='SpaceGrotesk'
                border='2px solid black'
            />
            </div>
            <Spacer />
            <div height='500px'>
            <Text mb='8px'>Fixed {language} :</Text>
            <Textarea
                value={fixed}
                onChange={handleFixedChange}
                placeholder=''
                width='500px'
                height='300px'
                fontFamily='SpaceGrotesk'
                border='2px solid black'
            />
            </div>
        </Flex>

        <GenerateButton 
            model_name="text-davinci-003"
            request_prompt={"##### Fix bugs in the code below\n\n### Buggy " + language + "\n" + buggy + "\n### Fixed " + language} 
            stop={["###"]} 
            setResult={setFixed}
            setError={setError}
            user_uid={props.user_uid}
          />

        <ErrorFooter error={error}></ErrorFooter> 
    </>
  );
}

export default Bugfixer;