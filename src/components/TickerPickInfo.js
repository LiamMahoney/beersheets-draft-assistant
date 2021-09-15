import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const TickerPickInfo = ({ round, pick }) => {

    return (
        <Flex
            flexDir="column"
        >
            <Box>
                <ColorModeSwitcher

                />
            </Box>
            <Flex 
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                paddingLeft={4}
                paddingRight={4}
            >
                <Text>
                    Round: {round}
                </Text>
                <Text>
                    Pick: {pick}
                </Text>
            </Flex>
        </Flex>
    )
}

export default TickerPickInfo;