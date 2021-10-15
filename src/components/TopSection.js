import React from 'react';
import { GridItem, Flex } from '@chakra-ui/react';
import TickerPickInfo from './TickerPickInfo';
import DraftedPlayerTicker from './DraftedPlayerTicker';

const TopSection = (props) => {

    return (
        <GridItem colSpan={24} rowSpan={2} borderBottom="1px" borderColor="inherit">
            <Flex height="100%">
                <TickerPickInfo 
                    pick={props.pick}
                    round={props.round}
                    handleUndoPick={props.handleUndoPick}
                />
                <DraftedPlayerTicker
                    draftedPlayers={props.draftedPlayers}
                    numberOfTeams={props.numberOfTeams}
                />
            </Flex>
        </GridItem>
    );
}

export default TopSection;