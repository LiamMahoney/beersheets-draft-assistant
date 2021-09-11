import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const DraftTickerPlayer = (props) => {

    const positionColorMap = {
        qb: useColorModeValue('red.300', 'red.600'),
        rb: useColorModeValue('blue.300', 'blue.600'),
        wr: useColorModeValue('green.300', 'green.600'),
        te: useColorModeValue('orange.300', 'orange.600'),
        def: useColorModeValue('yellow.300', 'yellow.600'),
        k: useColorModeValue('purple.300', 'purple.600')
    };

    return (
        <Flex
            // border="1px"
            backgroundColor={positionColorMap[props.position.toLowerCase()]}
            width="110px"
            margin={3}
            height="80%"
            maxHeight="110px"
            flexDirection="column"
            padding={1}
            boxShadow="sm"
            borderRadius={5}
        >
            <Text fontSize="xs">{props.position} - {props.team}</Text>
            <Flex flexGrow="1" flexDirection="column" justifyContent="flex-start">
                <Text fontSize="xs" >{props.name}</Text>
            </Flex>
            <Text fontSize="xs">{props.round}.{props.roundPick} - {props.pick}</Text>
        </Flex>
    );
}

export default DraftTickerPlayer;