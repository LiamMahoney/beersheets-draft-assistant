import React, { useState } from 'react';
import {
    Tr,
    Td,
    Button
} from '@chakra-ui/react';

const DraftButton = ({ handleClick }) => {

    return (
        <Button 
            colorScheme="green" 
            _focus="unset" 
            size="sm" 
            onClick={handleClick}
        >
            Draft
        </Button>
    )
}

const PlayerRow = ({ playerData, handleSelect }) => {
    const [display, setDisplay] = useState(true);

    const draftPlayer = () => {
        //TODO: figure out how to make spinner appear in button
        handleSelect(playerData);
        setDisplay(false);
    }

    console.log('display during render', display);

    return (
        <Tr
            display={display ? 'table-row' : 'none'}
        >
            <Td 
                position="sticky"
                left={0}
                zIndex={1}
            >
                {playerData.Name}
            </Td>
            <Td>{playerData['Tm/Bye']}</Td>
            <Td>{playerData.Pos}</Td>
            <Td>{playerData.Average}</Td>
            <Td>{playerData.PS}</Td>
            <Td>{playerData.Rank}</Td>
            <Td>{playerData.Tier}</Td>
            <Td>{playerData.ECRAvg}</Td>
            <Td
                position="sticky"
                right={0}
                zIndex={1}
            >
                <DraftButton
                    handleClick={draftPlayer}
                />
            </Td>
        </Tr>
    )
}

export default PlayerRow;