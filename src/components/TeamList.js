import React, { useState }from 'react';
import {
    IconButton,
    Flex,
    useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import DraftBoardTeam from './DraftBoardTeam';

const TeamList = (props) => {
    const [editing, setEditing] = useState(false);

    const editIconBackgroundColor = useColorModeValue("white", "gray.800");

    const handleEditClick = () => {
        setEditing(!editing);
    }

    return (
        <>
            <Flex 
                height="100%" 
                alignItems="center" 
                justifyContent="center"
                position="sticky"
                left={0}
                top={0}
                zIndex={4}
                backgroundColor={editIconBackgroundColor}
            >
                <IconButton
                    icon={ editing ? <CheckIcon /> : <EditIcon />}
                    size="xs"
                    variant="ghost"
                    _focus="unset"
                    onClick={handleEditClick}
                />
            </Flex>
            {
                props.draftData.map((team) => {
                    return (
                        <DraftBoardTeam 
                            team={team} 
                            editing={editing}
                            handleTeamNameChange={props.handleTeamNameChange}
                        />
                    )
                })
            }
        </>
    );
}

export default TeamList;