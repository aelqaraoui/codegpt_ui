import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

function ErrorFooter(props) {

    return (
        <Alert status='error' display={props.error.display} position='fixed' bottom='0'>
            <AlertIcon />
            <AlertTitle>{props.error.title}</AlertTitle>
        </Alert>
    )
}

export default ErrorFooter;
