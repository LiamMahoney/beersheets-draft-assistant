import React from 'react';
import {
    Grid,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import DraftTickerPlayer from './DraftTickerPlayer';
import TeamList from './TeamList';

const DraftBoardGrid = (props) => {

    const pickOrder = props.draftedPlayers.sort((a, b) => {
        return a.pick - b.pick
    });

    const rounds = props.draftedPlayers.reduce((previousValue, currentValue) => {
        if (previousValue.indexOf(currentValue.round) === -1) {
            return previousValue.concat(currentValue.round);
        }

        return previousValue;
    }, []);

    const roundLabelBackgroundColor = useColorModeValue("white", "gray.800");

    return (
        <Flex>
            <Grid
                templateColumns={`minmax(40px, 1fr) repeat(${props.numberOfTeams}, minmax(120px, 1fr))`}
                gridTemplateRows={`minmax(40px, 1fr)`}
                paddingRight={4}
                paddingBottom={2}
            >
                <TeamList 
                    draftData={props.draftData}
                    handleTeamNameChange={props.handleTeamNameChange}
                />
                {
                    // round numbers of the left side of the draft board
                    rounds.map((round) => {
                        return (
                            <Text
                                style={{'writing-mode': 'vertical-rl'}}
                                textAlign="center"
                                gridRow={round + 1}
                                gridColumn={1}
                                position="sticky"
                                left={0}
                                backgroundColor={roundLabelBackgroundColor}
                                padding={1}
                                fontFamily="heading"
                                fontWeight="bold"
                                lineHeight="4"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                Round {round}
                            </Text>
                        )

                    })
                }
                {
                    // player cards
                    pickOrder.map((p) => {    
                        return (
                            <DraftTickerPlayer
                                key={p.pick}
                                position={p.Pos}
                                name={p.Name}
                                team={p['Tm/Bye']}
                                pick={p.pick}
                                round={p.round}
                                roundPick={p.roundPick}
                                gridColumn={p.round % 2  === 0 ? (props.numberOfTeams - parseInt(p.roundPick)) + 2 : parseInt(p.roundPick) + 1}
                                gridRow={p.round + 1}
                            />
                        )
                    })
                }
            </Grid>
        </Flex>

    )
}

export default DraftBoardGrid;