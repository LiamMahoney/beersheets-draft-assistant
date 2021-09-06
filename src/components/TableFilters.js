import React from 'react';
import {
    Flex,
    Input,
    Select,
    InputGroup,
    InputLeftElement
  } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

const TableFilters = (props) => {

    const handleNameChange = (event) => {
        props.handleNameChange(event.target.value);
    }

    const handlePosChange = (event) => {
        props.handlePosChange(event.target.value);
    }

    const handleTeamChange = (event) => {
        props.handleTeamChange(event.target.value);
    }

    const positionOptions = props.positions.map((p) => {
        return <option key={p} value={p}>{p}</option>
    });
    
    const teamOptions = props.teams.map((t) => {
        if (t) {
            return (
                <option 
                    key={t} 
                    value={t}
                >
                    {t.substring(0, t.indexOf('/'))}
                </option>
            );
        } else {
            return undefined
        }

    });

    return (
        <Flex>
            <InputGroup margin={1.5}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon/>}
                />
                <Input 
                    onChange={handleNameChange}
                    placeholder="Player Name"
                />
            </InputGroup>
            <Select 
                placeholder="Position"
                margin={1.5}
                onChange={handlePosChange}
            >
                {positionOptions}
            </Select>
            <Select 
                placeholder="Team"
                margin={1.5}
                onChange={handleTeamChange}
            >
                {teamOptions}
            </Select>
        </Flex>
    )
}

export default TableFilters;