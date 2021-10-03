import React from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    GridItem,
    Flex,
    IconButton
} from '@chakra-ui/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon
} from '@chakra-ui/icons';
import DraftBoardGrid from './DraftBoardGrid';
import DraftBoardRosters from './DraftBoardRosters';

const DraftBoard = (props) => {

    return (
        <GridItem 
            colSpan={props.draftBoardExpanded ? 23 : 10} 
            rowSpan={10}
        >
            <Tabs
                height="100%"
                display="flex"
                flexDirection="column"
            >
                <Flex
                    borderBottom="2px solid"
                    borderColor="inherit"
                >
                    <IconButton 
                        icon={ props.draftBoardExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon /> } 
                        variant="ghost" 
                        _focus="unset" 
                        _hover="unset"
                        onClick={ () => props.setDraftBoardExpanded(!props.draftBoardExpanded) }
                    />
                    <TabList
                        justifyContent="space-evenly"
                        flexGrow={1}
                        borderBottom="unset"
                    >
                        <Tab _focus="unset">
                            Rosters
                        </Tab>
                        <Tab _focus="unset">
                            Draft Board
                        </Tab>
                    </TabList>
                </Flex>
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