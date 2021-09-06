import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const TickerPickInfo = ({ round, pick }) => {

    return (
        <Flex 
            padding={4}
            flexDir="column"
        >
            <Text>
                Round: {round}
            </Text>
            <Text>
                Pick: {pick}
            </Text>
        </Flex>
    )
}

export default TickerPickInfo;