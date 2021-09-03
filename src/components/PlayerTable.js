import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Box,
    Flex,
    GridItem,
    useColorModeValue
} from '@chakra-ui/react';

import PlayerRow from './PlayerRow';
import TableFilters from './TableFilters';

const StickyHeaderCell = (props) => {
    return (
        <Th 
            // https://adrianroselli.com/2020/01/fixed-table-headers.html
            // position="-webkit-sticky"
            position="sticky"
            top={0}
            zIndex={2}
            left={props.stickLeft ? 0 : 'unset'}
            right={props.stickRight ? 0 : 'unset'}
            bg="inherit"
        >
            {props.text}
        </Th>
    )
}

const PlayerTable = ({ players, selectPlayer }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [currPlayers, setCurrPlayers] = useState(players);

    //TODO: need to remove blank options from both of these - use reduce instead of map
    const positions = [...new Set(players.map(p => p.Pos))].sort();
    const teams = [...new Set(players.map(p => p['Tm/Bye']))].sort();
    const backgroundColor = useColorModeValue("white", "gray.800")

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

    const playerList = currPlayers.map((player) => {
        return (
            <PlayerRow 
                playerData={player}
                key={player.Name + player.Team}
                handleSelect={selectPlayer}
            />
        )
    })

    return (
        <GridItem colSpan={8} rowSpan={10} >
            <Flex width="100%" height="100%" flexDir="column" borderRight="1px">
                <TableFilters
                    handleNameChange={handleNameChangeDebounced}
                    handleTeamChange={handleTeamChange}
                    handlePosChange={handlePosChange}
                    teams={teams}
                    positions={positions}
                />
                <Box overflowY="scroll" flexGrow="1" maxHeight="100%">
                    <Table size="sm" width="100%" maxHeight="100%">
                        <Thead>
                            <Tr bg={backgroundColor}>
                                <StickyHeaderCell text="Name" stickLeft={true}/>
                                <StickyHeaderCell text="Team/Bye" />
                                <StickyHeaderCell text="Position" />
                                <StickyHeaderCell text="Value" />
                                <StickyHeaderCell text="Positional Scarcity" />
                                <StickyHeaderCell text="Position Rank" />
                                <StickyHeaderCell text="Position Tier" />
                                <StickyHeaderCell text="ECR" />
                                <StickyHeaderCell text="Draft" stickRight={true}/>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {playerList}
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </GridItem>
    )
}

// export default React.memo(PlayerTable, (prevProps, newProps) => {
//     console.log('prevProps', prevProps);
//     console.log('newProps', newProps);
//     if (prevProps.players.length === newProps.players.length) {
//         return true;
//     }
//     return false;
// });

export default PlayerTable;