import React from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    GridItem,
} from '@chakra-ui/react';
import DraftBoardGrid from './DraftBoardGrid';

const DraftBoard = (props) => {
    return (
        <GridItem 
            colSpan={5} 
            rowSpan={10}
        >
            <Tabs
                height="100%"
                display="flex"
                flexDirection="column"
                // overflow="auto"
            >
                <TabList
                    justifyContent="space-evenly"
                >
                    <Tab _focus="unset">
                        Rosters
                    </Tab>
                    <Tab _focus="unset">
                        Draft Board
                    </Tab>
                </TabList>
                <TabPanels
                    flexGrow={1}
                    overflow="scroll"
                >
                    <TabPanel
                        height="100%"
                        // overflowX="scroll"
                        padding={0}
                    >
                        Rosters
                    </TabPanel>
                    <TabPanel
                        height="100%"
                        // overflowX="scroll"
                        // overflowY="scroll"
                        padding={0}
                    >
                        <DraftBoardGrid
                                draftedPlayers={props.draftedPlayers}
                                numberOfTeams={props.numberOfTeams}
                            />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </GridItem>
    )
}

export default DraftBoard;