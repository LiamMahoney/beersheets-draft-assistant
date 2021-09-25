import React, { useState } from 'react';
import {
    Grid,
} from '@chakra-ui/react';
import PlayerTable from './PlayerTable.js';
import TopSection from './TopSection';
import DraftBoard from './DraftBoard.js';

const DraftAssistant = (props) => {
    const [draftedPlayers, setDraftedPlayers] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState(props.playerData);
    const [round, setRound] = useState(1);
    const [pick, setPick] = useState(1);

    const selectPlayer = (player) => {
        setAvailablePlayers(availablePlayers.filter(p => !(p.Name === player.Name && p.Average === player.Average)));

        const roundPick = pick % props.numberOfTeams === 0 ? props.numberOfTeams : pick % props.numberOfTeams;

        setDraftedPlayers(draftedPlayers.concat({...player, round, pick, roundPick}));

        setPick(pick + 1);
        
        setRound(
            pick % props.numberOfTeams === 0 ?
            round + 1:
            Math.floor(pick/props.numberOfTeams) + 1
        );
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
                numberOfTeams={props.numberOfTeams}
                round={round} 
                pick={pick}    
            />
            <PlayerTable
                players={availablePlayers}
                selectPlayer={selectPlayer}
            />
            <DraftBoard
                numberOfTeams={props.numberOfTeams}
                draftedPlayers={draftedPlayers}
                draftData={props.draftData}
                handleTeamNameChange={props.handleTeamNameChange}
            />
        </Grid>
    );
}

export default DraftAssistant;