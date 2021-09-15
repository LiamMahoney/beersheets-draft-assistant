import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const iconColor = useColorModeValue('gray.500', 'gray.400');

  return (
        <IconButton
            size="sm"
            fontSize="sm"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            _focus="unset"
            _hover={{color: iconColor}}
            _active="unset"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            padding={2}
            {...props}
        />
    );
};
