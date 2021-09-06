import React from 'react';
import { Flex } from '@chakra-ui/react';
import DraftTickerPlayer from './DraftTickerPlayer';

const DraftedPlayerTicker = ({ draftedPlayers, numberOfTeams }) => {

    const sortedPlayers = draftedPlayers.sort((a, b) => b.pick - a.pick)

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
            {sortedPlayers.map((p) => {
                return (
                    <DraftTickerPlayer
                        key={p.pick}
                        position={p.Pos}
                        name={p.Name}
                        team={p['Tm/Bye']}
                        pick={p.pick}
                        round={p.pick % numberOfTeams === 0 ? p.pick / numberOfTeams : Math.floor(p.pick / numberOfTeams) + 1}
                        roundPick={p.pick % numberOfTeams === 0 ? numberOfTeams : p.pick % numberOfTeams}
                    />
                )
            })}
        </Flex>
    )
}

export default DraftedPlayerTicker;