import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import {
    Box,
    Flex,
    GridItem,
} from '@chakra-ui/react';

import TableFilters from './TableFilters';
import ReactVirtualTable from './ReactVirtualTable';

const PlayerTable = ({ players, selectPlayer, draftBoardExpanded }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [currPlayers, setCurrPlayers] = useState(players);

    const positions = [...new Set(players.map(p => p.Pos))].sort();
    const teams = players.reduce((positions, player) => {
        // filtering out empty teams - appear as '/' in the csv - was also
        // getting undefined from somewhere that this also filters out
        if (player['Tm/Bye'] && player['Tm/Bye'] !== '/' && positions.indexOf(player['Tm/Bye']) === -1) {
            positions.push(player['Tm/Bye']);
        }
        return positions;
    }, []).sort();

    useEffect(() => {
        let tempPlayers = players;

        if (nameFilter) {
            tempPlayers = tempPlayers.filter((p) => {
                return p.Name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1;
            });
        }

        if (teamFilter) {
            tempPlayers = tempPlayers.filter((p) => {
                return p['Tm/Bye'] === teamFilter
            });
        }

        if (positionFilter) {
            tempPlayers = tempPlayers.filter((p) => {
                return p.Pos === positionFilter
            });
        }

        setCurrPlayers(tempPlayers);

    }, [players, nameFilter, teamFilter, positionFilter]);

    const handleNameChange = (value) => {
        setNameFilter(value);
    }

    const handleNameChangeDebounced = useMemo(
        () => debounce(handleNameChange, 250)
    , []);

    const handleTeamChange = (value) => {
        setTeamFilter(value);
    }

    const handlePosChange = (value) => {
        setPositionFilter(value);
    }

    return (
        <GridItem colSpan={ draftBoardExpanded ? 1 : 14 } rowSpan={10} overflow="auto" >
            <Flex width="100%" height="100%" flexDir="column" borderRight="1px" borderColor="inherit">
                <TableFilters
                    handleNameChange={handleNameChangeDebounced}
                    handleTeamChange={handleTeamChange}
                    handlePosChange={handlePosChange}
                    teams={teams}
                    positions={positions}
                />
                <Box flexGrow="1" overflowX="scroll">
                    <ReactVirtualTable
                        players={currPlayers}
                        selectPlayer={selectPlayer}
                    />
                </Box>
            </Flex>
        </GridItem>
    )
}

export default PlayerTable;