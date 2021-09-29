import React, { useMemo } from 'react';
import {
    Grid,
    Flex,
    Text,
    Box,
    useColorModeValue
} from '@chakra-ui/react';
import TeamList from './TeamList';
import DraftTickerPlayer from './DraftTickerPlayer';

const DraftBoardRosters = (props) => {
    const positionLabelBackgroundColor = useColorModeValue("white", "gray.800");

    /**
     * Creates a label for each position. This label will be used as a table
     * row header.
     * 
     * @returns {array} JSX objects to be rendered
     */
    const getPositionLabels = () => {
        let labels = [];

        for (let position in props.positionSettings) {
            for (let i = 0; i < props.positionSettings[position]; i++) {
                labels.push(
                    <Flex
                        height="80px"
                        gridRow={labels.length + 2}
                        gridColumn={1}
                        position="sticky"
                        left={0}
                        backgroundColor={positionLabelBackgroundColor}
                        padding={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text>
                            {position}
                        </Text>
                    </Flex>
                );
            }
        }

        return labels;
    }
    /**
     * Creates a map of all of the positions and the grid row indexes for those
     * positions. Used when filling data into the grid. 
     * 
     * @returns {object} contains each position as a key and the value is an array containing the grid rows for those positions. e.g. { 'QB': [1], 'RB': [3,2] }. Grid row indexes are sorted from highest to lowest.
     */
    const getPositionGridIndexMap = () => {
        const positionMap = {}

        let lastIndex = 1;
        
        for (let position in props.positionSettings) {
            let positionIndexes = [];

            for (let i = 0; i < props.positionSettings[position]; i++) {
                positionIndexes.splice(0, 0, lastIndex);
                lastIndex++;
            }

            positionMap[position] = positionIndexes;
        }

        return positionMap;
    }

    /**
     * Iterates over each team and adds players to the proper grid rows based
     * on their position.
     * 
     * @returns {array} JSX objects to be rendered
     */
    const createRosterPlayers = () => {
        let rosterBoard = [];

        for (let team of props.draftData) {
            // pop the values out of the position arrays so it knows that grid
            // row is no longer available
            let copyPositionIndexes = JSON.parse(JSON.stringify(positionGridIndexMap));

            for (let player of team.players) {
                // find the key that contains the player's position
                for (let position in copyPositionIndexes) {
                    if (copyPositionIndexes[position].length > 0) {
                        // position still has grid rows available
                        if (position.toLowerCase().indexOf(player.Pos.toLowerCase()) > -1) {
                            // player's position matches, add player to the 
                            // row that's popped
                            let rowIndex = copyPositionIndexes[position].pop();

                            rosterBoard.push(
                                <DraftTickerPlayer
                                    key={player.pick}
                                    position={player.Pos}
                                    name={player.Name}
                                    team={player['Tm/Bye']}
                                    gridColumn={team.pick + 1}
                                    gridRow={rowIndex + 1}
                                />
                            );

                            break;
                        }    
                    }
                }
                //TODO: if this is reached this means the player is a bench player. still need to figure out how to display them.
                // Maybe when this point is reached a function passed in from props needs to be called to append / ++ 'BN' in the positionSettings? will cause rerenders but I don't think it'll be the end of the world? seems like this is a lot of work to determine this just to have to do it over again
            }
        }

        return rosterBoard;
    }

    const positionGridIndexMap = getPositionGridIndexMap();
    const positionLabels = getPositionLabels();
    const rosterPlayers = createRosterPlayers();

    return (
        <Flex>
            <Grid
                templateColumns={`minmax(40px, 1fr) repeat(${props.draftData.length}, minmax(120px, 1fr))`}
                gridTemplateRows={`minmax(40px, 1fr)`}
                paddingRight={4}
                paddingBottom={2}
            >
                <TeamList 
                    draftData={props.draftData}
                    handleTeamNameChange={props.handleTeamNameChange}
                />
                {positionLabels}
                {rosterPlayers}
            </Grid>
        </Flex>
    );
}

export default DraftBoardRosters;