import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const DraftTickerPlayer = (props) => {

    const positionColorMap = {
        qb: 'red.300',
        rb: 'blue.300',
        wr: 'green.300',
        te: 'orange.300',
        def: 'yellow.300',
        k: 'purple.300'
    };

    return (
        <Flex
            border="2px"
            borderColor={positionColorMap[props.position.toLowerCase()]}
            width="100px"
            margin={3}
            height="80%"
            maxHeight="100px"
            flexDirection="column"
            padding={0.5}
            boxShadow="sm"
        >
            <Text fontSize="xs">{props.position} - {props.team}</Text>
            <Flex flexGrow="1" flexDirection="column" justifyContent="flex-start">
                <Text fontSize="xs" >{props.name}</Text>
            </Flex>
            <Text fontSize="xs">Pick {props.pick} - {props.round}.{props.roundPick}</Text>
        </Flex>
    );
}

export default DraftTickerPlayer;