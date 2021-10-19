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
    const [draftBoardExpanded, setDraftBoardExpanded] = useState(false);

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

    const undoPick = () => {
        // if pick === 1 then there aren't any picks to undo
        if (pick > 1) {
            let copyDraftData = [...props.draftData]
            
            // need these variables to find the last player taken in draftData
            const lastPick = pick - 1
            const lastRound = lastPick % props.draftData.length === 0 ?
                                round - 1 :
                                Math.floor(lastPick/props.draftData.length) + 1;
            const lastPickRoundPick = lastPick % props.draftData.length === 0 ? 
                                        props.draftData.length : 
                                        lastPick % props.draftData.length;
            const lastPickTeamPick = lastRound % 2 === 0 ?
                                        props.draftData.length - (lastPickRoundPick - 1) :
                                        lastPickRoundPick;

            let removedPlayer = copyDraftData[lastPickTeamPick - 1].players.pop();
            
            // unsetting values that get set when the player is picked
            removedPlayer.pick = undefined;
            removedPlayer.round = undefined;
            removedPlayer.roundPick = undefined;

            // updating state to undo the pick
            const newAvailablePlayers = availablePlayers.concat([removedPlayer]);

            const sortedNewAvailablePlayers = newAvailablePlayers.sort((a, b) => {
                return b.Average - a.Average;
            });

            setAvailablePlayers(sortedNewAvailablePlayers);
            props.setDraftData(copyDraftData);
            setRound(lastRound);
            setPick(lastPick);
            setDraftedPlayers(draftedPlayers.filter((player) => !(player.Name === removedPlayer.Name && player.Average === removedPlayer.Average)));
        }
    }

    return (
        <Grid
            h="100vh"
            w="100vw"
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(24, 1fr)"
        >
            <TopSection 
                draftedPlayers={draftedPlayers}
                numberOfTeams={props.draftData.length}
                round={round} 
                pick={pick} 
                handleUndoPick={undoPick}   
            />
            <PlayerTable
                players={availablePlayers}
                selectPlayer={selectPlayer}
                draftBoardExpanded={draftBoardExpanded}
            />
            <DraftBoard
                numberOfTeams={props.draftData.length}
                draftedPlayers={draftedPlayers}
                draftData={props.draftData}
                handleTeamNameChange={props.handleTeamNameChange}
                positionSettings={props.positionSettings}
                setPositionSettings={props.setPositionSettings}
                draftBoardExpanded={draftBoardExpanded}
                setDraftBoardExpanded={setDraftBoardExpanded}
            />
        </Grid>
    );
}

export default DraftAssistant;