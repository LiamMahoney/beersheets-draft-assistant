import React, { useState } from 'react';
import {
    Flex,
    Text,
    useColorModeValue,
    Input
} from '@chakra-ui/react';

const DraftBoardTeam = ({ team, editing, handleTeamNameChange }) => {
    const [teamName, setTeamName] = useState(team.name);

    const backgroundColor = useColorModeValue("white", "gray.800");

    const handleInputChange = (e) => {
        setTeamName(e.target.value);
        team.name = e.target.value;
        handleTeamNameChange(team);
    }

    return (
        <Flex
            justifyContent="space-around"
            gridColumn={team.pick + 1}
            paddingTop={2}
            position="sticky"
            top={0}
            backgroundColor={backgroundColor}

        >
            {
                editing
                ? <Input value={teamName} size="xs" margin={1} onChange={(e) => handleInputChange(e)} />
                : <Text>{team.name}</Text>
            }
        </Flex>
    );
}

export default DraftBoardTeam;