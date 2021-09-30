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
import DraftBoardRosters from './DraftBoardRosters';

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
                        padding={0}
                    >
                        <DraftBoardRosters
                            draftData={props.draftData}
                            handleTeamNameChange={props.handleTeamNameChange}
                            positionSettings={props.positionSettings}
                            setPositionSettings={props.setPositionSettings}
                        />
                    </TabPanel>
                    <TabPanel
                        height="100%"
                        padding={0}
                    >
                        <DraftBoardGrid
                                draftedPlayers={props.draftedPlayers}
                                numberOfTeams={props.numberOfTeams}
                                draftData={props.draftData}
                                handleTeamNameChange={props.handleTeamNameChange}
                            />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </GridItem>
    )
}

export default DraftBoard;