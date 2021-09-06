import React from 'react';
import { GridItem, Flex } from '@chakra-ui/react';
import TickerPickInfo from './TickerPickInfo';
import DraftedPlayerTicker from './DraftedPlayerTicker';
import TickerSettings from './TickerSettings';

const TopSection = (props) => {

    return (
        <GridItem colSpan={12} rowSpan={2} borderBottom="1px">
            <Flex height="100%">
                <TickerPickInfo 
                    pick={props.pick}
                    round={props.round}
                />
                <DraftedPlayerTicker
                    draftedPlayers={props.draftedPlayers}
                    numberOfTeams={props.numberOfTeams}
                />
                <TickerSettings />
            </Flex>
        </GridItem>
    );
}

export default TopSection;