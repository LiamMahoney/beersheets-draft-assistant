import React, { useState } from 'react';
import {
    Grid,
    GridItem
  } from '@chakra-ui/react';
import PlayerTable from './PlayerTable';
import TopSection from './TopSection';

const DraftAssistant = (props) => {
    const [draftedPlayers, setDraftedPlayers] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState(props.playerData);
    const [round, setRound] = useState(1);
    const [pick, setPick] = useState(1);

    const selectPlayer = (player) => {
        // setAvailablePlayers(availablePlayers.filter(p => p.Name !== player.Name && p.Average !== player.Average));
        setDraftedPlayers(draftedPlayers.concat({...player, round, pick}));

        setPick(pick + 1);
        //TODO: update wtih the correct number of teams
        //TODO: fix math error with rounds around back end of round
        setRound(Math.floor(pick/10) + 1);
    }

    return (
        <Grid
            h="100vh"
            w="100vw"
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(12, 1fr)"
        >
            <TopSection 
                draftedPlayers={draftedPlayers} 
                round={round} 
                pick={pick}    
            />
            <PlayerTable
                // players={availablePlayers}
                players={props.playerData}
                selectPlayer={selectPlayer}
            />
            <GridItem 
                colSpan={4} 
                rowSpan={10}
            />
        </Grid>
    );
}

export default DraftAssistant;