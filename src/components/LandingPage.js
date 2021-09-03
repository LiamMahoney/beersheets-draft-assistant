import React from 'react';
import {
    Flex,
    Input
  } from '@chakra-ui/react';

const LandingPage = (props) => {

    return (
        <Flex textAlign="center" fontSize="xl">
            <Input type="file" onChange={(e) => props.loadFile(e)}/>
        </Flex>
    );
}

export default LandingPage