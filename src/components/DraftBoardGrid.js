import React from 'react';
import {
    Grid,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import DraftTickerPlayer from './DraftTickerPlayer';

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
                templateColumns={`repeat(${props.numberOfTeams + 1}, 1fr)`}
                gridAutoRows="1fr"
                paddingRight={4}
                paddingBottom={2}
            >
                {
                    // round numbers of the left side of the draft board
                    rounds.map((round) => {
                        return (
                            <Text
                                style={{'writing-mode': 'vertical-rl'}}
                                textAlign="center"
                                gridRow={round}
                                gridColumn={1}
                                position="sticky"
                                left={0}
                                backgroundColor={roundLabelBackgroundColor}
                                padding={1}
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
                                gridColumn={p.round % 2  === 0 ? (props.numberOfTeams - p.roundPick) + 2 : p.roundPick + 1}
                                gridRow={p.round}
                            />
                        )
                    })
                }
            </Grid>
        </Flex>

    )
}

export default DraftBoardGrid;