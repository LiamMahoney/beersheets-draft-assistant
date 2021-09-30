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

        const roundPick = pick % props.draftData.length === 0 ? props.draftData.length : pick % props.draftData.length;
        setDraftedPlayers(draftedPlayers.concat({...player, round, pick, roundPick}));

        const teamPick = round % 2 === 0
                            ? props.draftData.length - (roundPick - 1)
                            : roundPick;


        let x = props.draftData.reduce((pv, cv) => {
            if (cv.pick === teamPick) {
                cv.players = cv.players.concat({...player, round, pick, roundPick})
            }

            return pv.concat(cv);
        }, [])

        props.setDraftData(x);

        setPick(pick + 1);
        
        setRound(
            pick % props.draftData.length === 0 ?
            round + 1:
            Math.floor(pick/props.draftData.length) + 1
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
                numberOfTeams={props.draftData.length}
                round={round} 
                pick={pick}    
            />
            <PlayerTable
                players={availablePlayers}
                selectPlayer={selectPlayer}
            />
            <DraftBoard
                numberOfTeams={props.draftData.length}
                draftedPlayers={draftedPlayers}
                draftData={props.draftData}
                handleTeamNameChange={props.handleTeamNameChange}
                positionSettings={props.positionSettings}
                setPositionSettings={props.setPositionSettings}
            />
        </Grid>
    );
}

export default DraftAssistant;