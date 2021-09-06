import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { RepeatClockIcon, ViewIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const TickerSettings = () => {

    return (
        <Flex flexDirection="column" justifyContent="space-around">
            <ColorModeSwitcher />
            <IconButton
                size="sm"
                fontSize="sm"
                variant="ghost"
                _focus="unset"
                icon={<ViewIcon />}
            />
            <IconButton
                size="sm"
                fontSize="sm"
                variant="ghost"
                _focus="unset"
                icon={<RepeatClockIcon />}
            />
        </Flex>
    )
}

export default TickerSettings