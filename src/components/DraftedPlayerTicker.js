import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import DraftTickerPlayer from './DraftTickerPlayer';

const DraftedPlayerTicker = ({ draftedPlayers, numberOfTeams }) => {

    const sortedPlayers = draftedPlayers.sort((a, b) => b.pick - a.pick)

    let objects = [];

    // allows us to create a break between rounds within the ticker
    sortedPlayers.forEach((p) => {

        objects.push(
            <DraftTickerPlayer
                key={p.pick}
                position={p.Pos}
                name={p.Name}
                team={p['Tm/Bye']}
                pick={p.pick}
                round={p.round}
                roundPick={p.roundPick}
            />
        );

        if (p.roundPick === 1) {
            // first pick of round - want to show the round in the ticker
            objects.push(
                <Text
                    style={{'writing-mode': 'vertical-rl'}}
                    fontFamily="heading"
                    fontWeight="bold"
                    lineHeight="4"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    Round {p.round}
                </Text>
            );
        }
    });

    return (
        <Flex 
            flexGrow={1} 
            justifyContent="center" 
            alignItems="flex-start" 
            overflowX="scroll" 
            flexDirection="column" 
            flexWrap="wrap" 
            alignContent="flex-start"
        >
            {objects}
        </Flex>
    )
}

export default DraftedPlayerTicker;