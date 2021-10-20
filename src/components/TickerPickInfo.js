import React from 'react';
import { Flex, Text, IconButton, useColorModeValue, Tooltip} from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const TickerPickInfo = ({ round, pick, handleUndoPick }) => {
    const iconColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Flex
            flexDir="column"
        >
            <Flex
                justifyContent="space-between"
            >
                <ColorModeSwitcher/>
                <Tooltip
                    label="undo pick"
                    aria-label="undo pick tooltip"
                >
                    <IconButton
                        size="sm"
                        fontSize="sm"
                        aria-label="Undo last pick"
                        variant="ghost"
                        color="current"
                        _focus="unset"
                        _hover={{color: iconColor}}
                        _active="unset"
                        padding={2}
                        onClick={handleUndoPick}
                        icon={ <RepeatClockIcon /> }
                    />
                </Tooltip>
            </Flex>
            <Flex 
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                paddingLeft={4}
                paddingRight={4}
            >
                <Text
                    fontFamily="heading"
                    fontWeight="bold"
                    lineHeight="4"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    Round: {round}
                </Text>
                <Text
                    fontFamily="heading"
                    fontWeight="bold"
                    lineHeight="4"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    Pick: {pick}
                </Text>
            </Flex>
        </Flex>
    )
}

export default TickerPickInfo;