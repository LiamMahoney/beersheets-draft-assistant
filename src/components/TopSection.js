import React from 'react';
import { GridItem, Flex, Box, Text, IconButton } from '@chakra-ui/react';
import { RepeatClockIcon, ViewIcon } from '@chakra-ui/icons';
import DraftTickerPlayer from './DraftTickerPlayer';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const TopSection = (props) => {

    const sortedPlayers = props.draftedPlayers.sort((a, b) => b.pick - a.pick)

    console.log('props.draftedPlayers during render', props.draftedPlayers);

    return (
        <GridItem colSpan={12} rowSpan={2} borderBottom="1px">
            <Flex height="100%">
                <Box padding={4}>
                    <Text>
                        Round: {props.round}
                    </Text>
                    <Text>
                        Pick: {props.pick}
                    </Text>
                </Box>
                <Flex 
                    flexGrow={1} 
                    justifyContent="center" 
                    alignItems="flex-start" 
                    overflowX="scroll" 
                    flexDirection="column" 
                    flexWrap="wrap" 
                    alignContent="flex-start"
                >
                    {sortedPlayers.map((p) => {
                        return (
                            <DraftTickerPlayer
                                key={p.pick}
                                position={p.Pos}
                                name={p.Name}
                                team={p['Tm/Bye']}
                                pick={p.pick}
                                round={Math.floor(p.pick/10) + 1}
                                roundPick={p.pick % 10}
                            />
                        )
                    })}
                </Flex>
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
            </Flex>
        </GridItem>
    );
}

export default TopSection;